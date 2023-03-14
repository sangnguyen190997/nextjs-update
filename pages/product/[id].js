import { useRouter } from "next/router";
import Page from "../components/Home/HomeLayout";
import { useEffect, useState } from "react";
import { getProduct, getProductById } from "@/services/productApi";
import ProductForYou from "../components/Home/ProductForYou";
import { useDispatch, useSelector } from "react-redux";
import { incrementItem } from "@/redux/cartSlice";
import { createComment, getComment } from "@/services/commentApi";
import moment from "moment/moment";
import { FaBeer } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import HomeLayout from "../components/Home/HomeLayout";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Comment from "../components/Comment";

export default function Home({ data, newComment }) {
  const router = useRouter();
  const { id } = router.query;
  const [star, setStar] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [comment, setComment] = useState(null);
  const [loadComment, setLoadComment] = useState(false);

  const user = useSelector((state) => state.auth.login.currentUser);
  // const newData = { ...data };

  // const newData = data.reduce(function (target, key, index) {
  //   target[index] = key;
  //   return target;
  // }, {});

  console.log({ data });
  console.log({ newComment });
  console.log({ comment });

  const incrementQuantity = () => {
    setQuantity((value) => value + 1);
  };

  const decrementQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((value) => value - 1);
  };

  const handleAddToCart = (data, quantity) => {
    data.map((product) => dispatch(incrementItem({ product, quantity })));
  };

  const changeText = (value) => {
    quantity(value);
  };

  const handleComment = async () => {
    const data = { id, user, comment, star };
    await createComment(data, user.access_token);
    setLoadComment(true);
  };

  useEffect(() => {
    (async () => {
      const newData = await getComment(id);
      if (newData) {
        setComment(newData);
      }
    })();
  }, [loadComment]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Fetch the updated data from the server
  //     getComment(id).then((newData) => {
  //       setComment(newData);
  //     });
  //   }, 3000);

  //   // return () => {
  //   //   clearInterval(intervalId);
  //   // };
  // }, [loadComment]);

  return (
    <DefaultLayout>
      <div className="container mx-auto">
        <div className=" my-20">
          <div className="grid grid-cols-12">
            <div>
              <div className="grid grid-rows-4">
                <img className="w-28" src={data?.image1} alt={data?.image1} />
                <img
                  className="w-28 my-1"
                  src={`${data[0].image2}`}
                  alt={`${data[0].image2}`}
                />
                <img
                  className="w-28 my-1"
                  src={`${data[0].image3}`}
                  alt={`${data[0].image3}`}
                />
                <img
                  className="w-28"
                  src={`${data[0].image4}`}
                  alt={`${data[0].image4}`}
                />
              </div>
            </div>
            <div className="col-span-5">
              <img
                className="w-4/5"
                src={`${data[0].image1}`}
                alt={`${data[0].image1}`}
              />
            </div>
            <div className="col-span-5">
              <h1 className="text-4xl font-bold	">{`${data[0].name}`}</h1>
              <p className="my-5 text-xl">${`${data[0].price}`}</p>
              <p className="text-xl">{`${data[0].describe}`}</p>
              <div className="my-5 flex justify-between items-baseline	">
                <div className="border border-solid border-inherit flex px-2 justify-between w-1/3">
                  <span className="text-xl mr-4 leading-10">Quantity</span>

                  <button
                    className="border-r-2 border-gray-500 font-bold text-xl	w-1/4	"
                    style={{ cursor: "pointer" }}
                    onClick={decrementQuantity}
                  >
                    -
                  </button>

                  <input
                    className="border-0 p-0 w-10 text-center"
                    type="text"
                    value={quantity}
                    onChange={(e) => changeText(e.target.value)}
                  />
                  <button
                    className="border-l-2 border-gray-500 font-bold text-xl	w-1/4	"
                    style={{ cursor: "pointer" }}
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    // onClick={() => handleAddToCart(product, quantity)}
                    onClick={() => handleAddToCart(data, quantity)}
                    className="text-white bg-green-500 focus:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Add to cart
                  </button>
                </div>
                <div>
                  <button className="text-white bg-green-500 focus:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    Add to wishlist
                  </button>
                </div>
              </div>
              <br />
              <ul className="list-unstyled small d-inline-block">
                <li className="px-3 py-2 mb-1 bg-white text-muted">
                  <strong className="text-uppercase text-dark">
                    Category:
                  </strong>
                  <a className="reset-anchor ml-2">{`${data[0].category}`}s</a>
                </li>
                <li className="px-3 py-2 mb-1 bg-white text-muted">
                  <strong className="text-uppercase text-dark">Tags:</strong>
                  <a className="reset-anchor ml-2">Innovation</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <label
            // for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your comment
          </label>
          <textarea
            // value={comment}
            onChange={(e) => setComment(e.target.value)}
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <div className="flex justify-between mt-10">
          <div className="flex w-25">
            <span className="mt-2">Evaluate: </span>
            &nbsp; &nbsp;
            <div className="mb-6">
              <input
                min={0}
                max={5}
                value={star}
                onChange={(e) => setStar(e.target.value)}
                type="number"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            &nbsp; &nbsp;
            <span className="mt-2">Star</span>
          </div>
          <div>
            <button
              onClick={() => handleComment()}
              className="text-white bg-green-500 focus:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Send
            </button>
          </div>
        </div>
        <br />
        <div className="border border-solid border-inherit p-3 inline-block uppercase bg-slate-700	text-white">
          Reviews
        </div>
        <div className="p-10 p-lg-5 bg-white">
          <div className="grid-cols-8">
            {comment?.map((value) => (
              <div className="mb-3 flex" key={value.id}>
                <div>
                  <img
                    className="rounded-full"
                    src="https://picsum.photos/200"
                    alt=""
                    width="50"
                  />
                </div>
                <div className="ml-3">
                  <h6 className="mb-0 uppercase">{value.fullname}</h6>
                  <p className="text-current mb-0 uppercase">
                    {moment(value.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                  </p>
                  <ul className="list-inline mb-1 text-xs">
                    <li className="list-inline-item m-0">
                      <i className={value.star1}></i>
                    </li>
                    <li className="list-inline-item m-0">
                      <i className={value.star2}></i>
                    </li>
                    <li className="list-inline-item m-0">
                      <i className={value.star3}></i>
                    </li>
                    <li className="list-inline-item m-0">
                      <i className={value.star4}></i>
                    </li>
                    <li className="list-inline-item m-0">
                      <i className={value.star5}></i>
                    </li>
                  </ul>
                  <p className="text-small mb-0 text-muted">{value.content}</p>
                </div>
              </div>
            ))}
            {/* <Comment /> */}
          </div>
        </div>
        <h2 className="text-xl uppercase mb-4">Related products</h2>
        <div className="block">
          <ProductForYou />
        </div>
      </div>
    </DefaultLayout>
  );
}

// export async function getStaticProps({ params }) {
//   const data = await getProductById(params.id);
//   const newComment = await getComment(params.id);
//   return {
//     props: {
//       data,
//       newComment,
//     },
//     revalidate: 5,
//   };
// }

// export async function getStaticPaths() {
//   const productList = await getProduct();

//   return {
//     paths: productList?.map((product) => {
//       return {
//         params: { id: String(product.id) },
//       };
//     }),
//     fallback: false,
//   };
// }

// export const getServerSideProps = async () => {
//   const data = await getProductById(params.id);
//   const newComment = await getComment(params.id);
//   return {
//     props: {
//       data,
//       newComment,
//     },
//   };
// };

export async function getServerSideProps({ params }) {
  const data = await getProductById(params.id);
  const newComment = await getComment(params.id);
  return {
    props: {
      data,
      newComment,
    },
  };
}
