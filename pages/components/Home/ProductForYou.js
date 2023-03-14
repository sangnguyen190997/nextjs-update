import { getProduct } from "@/services/productApi";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";

export default function ProductForYou({ product }) {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };
  const [finalData, setFinalData] = useState(product);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch the updated data from the server
      getProduct().then((newData) => {
        setFinalData(newData);
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Fragment>
      <Slider {...settings}>
        {finalData?.map((item, index) => {
          return (
            <div className="shadow pl-10" key={index}>
              <div className="product text-center">
                <div className="relative mb-3">
                  <Link className="block" href={`/product/${item.id}`}>
                    <img
                      className="w-full"
                      style={{ height: "300px" }}
                      src={item.image1}
                      alt={item.image1}
                    />
                  </Link>
                  <div className="product-overlay">
                    <ul className="mb-0 list-inline">
                      <li className="list-inline-item">
                        <button
                          type="button"
                          class="text-white bg-green-500 focus:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                          Add to cart
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-3">
                  <h6>
                    <a className="reset-anchor" href="detail.html">
                      <p className="d-block"> {item.name}</p>
                    </a>
                  </h6>
                  <p className="small text-muted font-weight-bold">
                    ${item.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <div className="py-20">
        <section className="py-10 bg-slate-100">
          <div className="container">
            <div className="grid grid-cols-3 text-center">
              <div className="inline-block m-auto	">
                <div className="media align-items-end">
                  <div className="media-body text-left ml-3">
                    <h6 className="text-uppercase mb-1">Free shipping</h6>
                    <p className="text-small mb-0 text-muted">
                      Free shipping worlwide
                    </p>
                  </div>
                </div>
              </div>
              <div className="inline-block m-auto">
                <div className="media align-items-end">
                  <div className="media-body text-left ml-3">
                    <h6 className="text-uppercase mb-1">24 x 7 service</h6>
                    <p className="text-small mb-0 text-muted">
                      Free shipping worlwide
                    </p>
                  </div>
                </div>
              </div>

              <div className="inline-block m-auto">
                <div className="media align-items-end">
                  <div className="media-body text-left ml-3">
                    <h6 className="text-uppercase mb-1">Festival offer</h6>
                    <p className="text-small mb-0 text-muted">
                      Free shipping worlwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="container pt-20">
            <div className="grid grid-cols-12">
              <div className="col-span-6 mb-3">
                <h5 className="uppercase">Let's be friends!</h5>
                <p className="text-base text-current mb-0">
                  Welcome to my shop ecommerece!!!
                </p>
              </div>
              <div className="col-span-6">
                <form>
                  <div className="mb-6 flex">
                    <input
                      type="email"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      placeholder="name@cyberlogitec.com"
                      required
                    />
                    <button
                      type="submit"
                      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
