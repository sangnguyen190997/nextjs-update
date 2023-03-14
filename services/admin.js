// base URl for all api calls
const baseURl = `http://localhost:3000`;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJraGFpbmd1eWVuQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiS2hhaSBOZ3V5ZW4iLCJpYXQiOjE2Nzg2NzI0NzQsImV4cCI6MTY3OTI3NzI3NH0.9ayKIFmLNNP2zRliTnRaKaB6n2IAjZWqMclULI5q90I`;

// getting all users data
export const getUserData = async () => {
  try {
    const res = await fetch(`${baseURl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in fetching user data for admin (services) => " + error);
  }
};

// deleting User
export const deleteUser = async (id) => {
  const tempObj = { isActive: false };
  const jsonn = JSON.stringify(tempObj);
  try {
    const res = await fetch(`${baseURl}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: jsonn,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in deleting category Data => " + error);
  }
};

// Adding Category
export const add_Category = async (category) => {
  try {
    const res = await fetch(`${baseURl}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Facing error at addCategory client => " + err);
  }
};

// getting all categories data
export const getCategoriesData = async () => {
  try {
    const res = await fetch(`${baseURl}/category`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in getting Categories data (services) => " + error);
  }
};

// deleting  Category
export const deleteCategory = async (id) => {
  const tempObj = { isActive: false };
  const jsonn = JSON.stringify(tempObj);
  try {
    const res = await fetch(`${baseURl}/category/delete/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: jsonn,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in deleting category Data => " + error);
  }
};

// getting Category by id
export const getCategoryById = async (id) => {
  try {
    const res = await fetch(`${baseURl}/api/admin/getCategoryById?id=${id}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in getting specific category (services) => " + error);
  }
};

// updating Category
export const update_Category = async (category) => {
  console.log(" i got call");
  try {
    const res = await fetch(`${baseURl}/api/admin/category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in updating category (services) => " + error);
  }
};

// ---------------------------------------------- Products---------------------------------------------------------------------------------

// adding Product
export const add_products = async (product) => {
  try {
    debugger;
    const res = await fetch(`${baseURl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in saving product (services) => " + error);
  }
};

// getting all products data
export const getProductsData = async () => {
  try {
    const res = await fetch(`${baseURl}/products/admin`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJraGFpbmd1eWVuQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiS2hhaSBOZ3V5ZW4iLCJpYXQiOjE2Nzg1MTUwMzgsImV4cCI6MTY3OTExOTgzOH0.A41aXSsBLkWDtfjQlVPqMx9qvgfa3FvatRwYqR8IETk",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in getting products data (services) => " + error);
  }
};

// getting products data by pagination
export const getProducts_PaginationData = async (param) => {
  try {
    const res = await fetch(`${baseURl}/products/panigationAdmin?${param}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJraGFpbmd1eWVuQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiS2hhaSBOZ3V5ZW4iLCJpYXQiOjE2Nzg1MTUwMzgsImV4cCI6MTY3OTExOTgzOH0.A41aXSsBLkWDtfjQlVPqMx9qvgfa3FvatRwYqR8IETk",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in getting products data (services) => " + error);
  }
};

// delete specific product

export const delete_Product = async (id) => {
  try {
    const tempObj = { isActive: false };
    const jsonn = JSON.stringify(tempObj);
    const res = await fetch(`${baseURl}/products/delete/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJraGFpbmd1eWVuQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiS2hhaSBOZ3V5ZW4iLCJpYXQiOjE2Nzg1MTUwMzgsImV4cCI6MTY3OTExOTgzOH0.A41aXSsBLkWDtfjQlVPqMx9qvgfa3FvatRwYqR8IETk",
      },
      body: jsonn,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in deleting product Data (services) => " + error);
  }
};

// getting product by id
export const getProductByID = async (id) => {
  try {
    const res = await fetch(`${baseURl}/products/admin/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJraGFpbmd1eWVuQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiS2hhaSBOZ3V5ZW4iLCJpYXQiOjE2Nzg1MTUwMzgsImV4cCI6MTY3OTExOTgzOH0.A41aXSsBLkWDtfjQlVPqMx9qvgfa3FvatRwYqR8IETk",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in getting specific product (services) => " + error);
  }
};

// updating product
export const update_product = async (product, id) => {
  try {
    const res = await fetch(`${baseURl}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;  charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in updating category (services) => " + error);
  }
};

// --------------------------------- view product by categories --------------------------------------------------------------------

export const get_Product_By_Category = async (id) => {
  try {
    const res = await fetch(
      `${baseURl}/api/frontend/getProductByCategory?id=${id}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error at getting product by category (services) => " + error);
  }
};

// --------------------------------- Add to cart --------------------------------------------------------------------

export const add_to_cart = async (product) => {
  try {
    const res = await fetch(`${baseURl}/api/frontend/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error at adding product to cart (services) => " + error);
  }
};

// --------------------------------- get cart data --------------------------------------------------------------------

export const get_cart_data = async (id) => {
  try {
    const res = await fetch(`${baseURl}/api/frontend/cart?id=${id}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error at getting cart data (services) => " + error);
  }
};

// --------------------------------- delete cart data --------------------------------------------------------------------

export const delete_cart_data = async (data) => {
  try {
    const res = await fetch(`${baseURl}/api/frontend/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const reply = await res.json();
    return reply;
  } catch (error) {
    console.log("error at deleting cart data (services) => " + error);
  }
};

// --------------------------------- update cart data --------------------------------------------------------------------
export const update_cart_data = async (data) => {
  try {
    const res = await fetch(`${baseURl}/api/frontend/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const reply = await res.json();
    return reply;
  } catch (error) {
    console.log("error at updating cart data (services) => " + error);
  }
};

//--------------------------------- History--------------------------------------------------------------------

// getting all history data
export const getHistoryData = async () => {
  try {
    const res = await fetch(`${baseURl}/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in fetching user data for admin (services) => " + error);
  }
};

// getting history by user id data
export const getHistoryByUserId = async (id) => {
  try {
    const res = await fetch(`${baseURl}/history/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in fetching user data for admin (services) => " + error);
  }
};
//gettig cart by user id
export const getCartByUserId = async (id) => {
  try {
    const res = await fetch(`${baseURl}/carts/${id}`, {
      method: "GET",
      eaders: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in getting cart (services) => " + error);
  }
};
