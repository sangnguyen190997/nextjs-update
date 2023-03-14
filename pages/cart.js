import Page from "./components/Home/HomeLayout";
import EmptySection from "./components/emptySection";
import { Fragment, useEffect } from "react";
import CartFilter from "./components/cartFilter";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "@/redux/cartSlice";
import { useRouter } from "next/router";
import DefaultLayout from "./components/Layout/DefaultLayout";
import CartEmpty from "./components/CartEmpty";

export default function Cart() {
  const Router = useRouter();
  const dispatch = useDispatch();
  const { carts, cartTotalPrice, cartToTalProduct } = useSelector(
    (state) => state.cart
  );

  console.log({ carts });

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [carts]);

  const user = useSelector((state) => state.auth.login.currentUser);

  const handleProcess = () => {
    if (user !== null) {
      Router.push("/checkout");
    } else {
      Router.push("/login");
    }
  };

  const handleBackShopping = () => {
    Router.push("/productpage");
  };

  return (
    <DefaultLayout>
      {carts.length === 0 ? (
        <CartEmpty />
      ) : (
        <Fragment>
          <div className="container mx-auto m-20">
            <section className="py-5 bg-slate-100	">
              <div className="container mx-auto">
                <div className="flex justify-between p-10">
                  <h1 className="h2 uppercase mb-0 font-semibold text-4xl	">
                    Cart
                  </h1>
                  <h1 className="text-2xl">Cart</h1>
                </div>
              </div>
            </section>
            <section className="py-10">
              <h2 className="uppercase mb-4 font-semibold">Shopping cart</h2>
              <div className="grid grid-cols-12">
                <div className="col-span-9">
                  <CartFilter />
                </div>

                <div className="col-span-3">
                  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="card-body">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                        Cart total
                      </h5>
                      <ul className="list-none mb-0">
                        <li className="border-b-2 my-5"></li>
                        <li className="flex items-center justify-between">
                          <strong className="uppercase font-semibold">
                            Total Product
                          </strong>
                          <span className="text-current">
                            {cartToTalProduct}
                          </span>
                        </li>
                        <li className="border-b-2 my-5"></li>
                        <li className="flex items-center justify-between">
                          <strong className="uppercase font-semibold">
                            Subtotal
                          </strong>
                          <span className="text-current">
                            ${cartTotalPrice}
                          </span>
                        </li>
                        <li className="border-b-2 my-5"></li>
                        <li className="flex items-center justify-between mb-4">
                          <strong className="uppercase font-semibold">
                            Total
                          </strong>
                          <span>${cartTotalPrice}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => handleBackShopping()}
              >
                Continue shopping
              </button>

              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => handleProcess()}
              >
                Procceed to checkout
              </button>
            </section>
          </div>
        </Fragment>
      )}
    </DefaultLayout>
  );
}
