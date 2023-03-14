import { getProduct } from "@/services/productApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function ProductBigSale({ product }) {
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
    (async () => {
      const newData = await getProduct();
      setFinalData(newData);
    })();
  }, []);

  return (
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
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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
                  ${item.price} -{" "}
                  <span className="bg-amber-300">{item.promotionPercent}%</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
