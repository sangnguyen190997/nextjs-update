import {
  addToCart,
  decrementItem,
  removeItem,
  showQuantity,
} from "@/redux/cartSlice";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartFilter = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);

  const handleDecrement = (product) => {
    dispatch(decrementItem(product));
  };
  const handleShowQuantity = (product, quantity) => {
    dispatch(showQuantity(product, quantity));
  };
  const handleIncrement = (product) => {
    dispatch(addToCart(product));
  };
  const handleRemove = (prodcut) => {
    dispatch(removeItem(prodcut));
  };
  return (
    <Fragment>
      <div className="mb-4">
        <div className="relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 uppercase">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item) => (
                <Fragment>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={item.product.image1}
                        alt={item.product.image1}
                        width="70"
                      />
                    </th>
                    <td className="px-6 py-4">{item.product.name}</td>
                    <td className="px-6 py-4">{item.product.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-row h-10 w-2/5 rounded-lg relative bg-transparent mt-1">
                        <button
                          onClick={() => handleDecrement(item)}
                          data-action="decrement"
                          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                        >
                          <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                          type="text"
                          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                          name="custom-input-number"
                          value={item.quantity}
                          onChange={() =>
                            handleShowQuantity(item, item.quantity)
                          }
                        />
                        <button
                          onClick={() => handleIncrement(item)}
                          data-action="increment"
                          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                        >
                          <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="mb-0 small">
                        $
                        {parseInt(item.quantity) * parseInt(item.product.price)}
                      </p>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default CartFilter;
