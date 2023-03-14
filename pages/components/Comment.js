import { getComment } from "@/services/commentApi";
import { getProduct, getProductById } from "@/services/productApi";
import React, { Fragment } from "react";

const Comment = ({ newComment, data }) => {
  //   console.log({ newComment });
  //   console.log({ data });
  return (
    <Fragment>
      {newComment?.map((value) => (
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
    </Fragment>
  );
};

export default Comment;

export async function getStaticProps({ params }) {
  const data = await getProductById(params.id);
  const newComment = await getComment(params.id);
  console.log({ newComment });
  console.log({ data });
  console.log({ params });
  return {
    props: {
      data,
      newComment,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const productList = await getProduct();

  return {
    paths: productList?.map((product) => {
      return {
        params: { id: String(product.id) },
      };
    }),
    fallback: false,
  };
}
