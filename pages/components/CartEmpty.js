import Link from "next/link";
import React from "react";

const CartEmpty = () => {
  return (
    <div className=" flex flex-col text-center items-center mt-5 mb-44">
      <div>
        <img
          src="https://img.freepik.com/premium-vector/online-shop-logo-template_59362-81.jpg?w=360"
          alt="img"
          width={350}
          height={350}
        />
      </div>
      <div>
        <p className="mb-4 font-semibold">
          {" "}
          Bạn chưa có sản phẩm nào trong giỏ hàng
        </p>
        <Link
          href="/productpage"
          className="text-sm text-center py-3 px-4 border border-indigo-600 text-white hover-zoom my-5"
        >
          TIẾP TỤC MUA SẮM
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
