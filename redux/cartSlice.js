const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    cartTotalPrice: 0,
    cartToTalProduct: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.carts[itemIndex].quantity += 1;
      } else {
        const newProduct = { ...action.payload, quantity: 1 };
        state.carts.push(newProduct);
      }
    },
    incrementItem: (state, action) => {
      const { item, quantity } = action.payload;
      console.log(action.payload.product.id);

      const itemIndex = state.carts.findIndex(
        (pr) => pr.product.id === item.id
      );
      if (itemIndex !== -1) {
        state.carts[itemIndex].quantity += quantity;
      } else {
        const newProduct = { ...action.payload, quantity };
        state.carts.push(newProduct);
      }
    },
    getTotalPrice: (state) => {
      const totalPrice = state.carts.reduce((total, product) => {
        return total + product.product.price * product.quantity;
      }, 0);
      const totalProduct = state.carts.reduce((total, product) => {
        return total + product.quantity;
      }, 0);

      if (totalPrice && totalProduct) {
        state.cartTotalPrice = totalPrice;
        state.cartToTalProduct = totalProduct;
      }
    },
    showQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const indexItem = state.carts.findIndex((item) => item.id === product.id);
      state.carts[indexItem].quantity = quantity;
    },

    decrementItem: (state, action) => {
      const indexItem = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (action.payload.quantity <= 1) {
        // alert("Ít nhất phải có một sản phẩm");
        return;
      } else {
        state.carts[indexItem].quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const newCart = state.carts.filter((item) => item.product.id !== itemId);

      if (state.carts.length === 0) {
        return {
          ...state,
          carts: newCart,
          cartTotalPrice: 0,
          cartToTalProduct: 0,
        };
      } else {
        return { ...state, carts: newCart };
      }
    },
  },
});

export const {
  addToCart,
  incrementItem,
  getTotalPrice,
  showQuantity,
  decrementItem,
  removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;
