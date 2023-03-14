import Link from "next/link";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";
import ProductsGrid from "./productsGrid";

export default function ProductSection({ products }) {
  const Router = useRouter();
  if (!products) {
    return;
  }
  const productFilter = [...products];

  const handleProductDetail = (id) => {
    Router.push(`/product/${id}`);
  };
  return (
    <div>
      <ProductsGrid>
        {products?.map((item, index) => {
          return (
            <article>
              <div className="product-img-box">
                <Link href={`/product/${item.id}`} legacyBehavior>
                  <img src={item.image1} />
                </Link>
              </div>

              <Link href={`/product/${item.id}`} legacyBehavior>
                <a className="product-name">{item.name}</a>
              </Link>

              <div className="rating">
                <StarRatings
                  rating={2}
                  starRatedColor="#F9AD3D"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="1px"
                />
              </div>

              <div className="price">
                <p className="price-value">${item.price}</p>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => handleProductDetail(item.id)}
                  className="text-white bg-green-500 focus:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Add to cart
                </button>
              </div>
              <style jsx>{`
                article {
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  box-sizing: border-box;
                  height: 100%;
                  padding: 24px;
                  background: white;
                  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
                  border-radius: 6px;
                }
                .top-buttons {
                  margin-bottom: 24px;
                  align-self: flex-end;
                }
                .top-buttons .add-wishlist {
                  background: none;
                  border: none;
                }
                .top-buttons .add-wishlist:focus {
                  outline: none;
                }
                .product-img-box {
                  margin-bottom: 28px;
                }
                .product-img {
                  width: 225px;
                  height: 160px;
                  object-fit: contain;
                }
                .product-name {
                  width: 80%;
                  line-height: 20px;
                  text-decoration: none;
                  font-weight: 500;
                  font-size: 14px;
                  text-align: center;
                  color: #666666;
                  margin-bottom: 18px;
                }
                .product-name:hover {
                  text-decoration: underline;
                  font-weight: 600;
                }
                .rating {
                  margin-bottom: 24px;
                }
                .price {
                  display: flex;
                  align-items: center;
                  font-weight: 900;
                  font-size: 16px;
                  color: #666666;
                }
                .price .add-cart {
                  background: none;
                  border: none;
                  margin-left: 5px;
                }
                .price .add-cart:focus {
                  outline: none;
                }
              `}</style>
            </article>
          );
        })}
      </ProductsGrid>
    </div>
  );
}
