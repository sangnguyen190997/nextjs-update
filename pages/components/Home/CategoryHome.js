import React from "react";
import Link from "next/link";
import ProductBigSale from "./ProductBigSale";
import ProductForYou from "./ProductForYou";

export default function CategoryHome() {
  return (
    <div className="py-5">
      <div className="container mx-auto">
        <div className="text-center">
          <p className="uppercase"> Carefully created collections</p>
          <h2 className="uppercase mb-4 font-semibold text-lg">
            Browse our categories
          </h2>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-10">
            <Link href="/productpage" className="category-item">
              <img
                className="w-full"
                src="/images/cat-img-1.jpg"
                alt="cat-img-1.jpg"
              />
              <strong className="category-item-title">Clothes</strong>
            </Link>
            <Link href="/productpage" className="category-item">
              <img
                className="w-full"
                src="/images/cat-img-4.jpg"
                alt="cat-img-4.jpg"
              />
              <strong className="category-item-title">Electronics</strong>
            </Link>
            <div className="grid gap-7">
              <Link href="/productpage" className="category-item">
                <img
                  className="w-full"
                  src="/images/cat-img-2.jpg"
                  alt="cat-img-2.jpg"
                />
                <strong className="category-item-title">Shoes</strong>
              </Link>
              <Link href="/productpage" className="category-item">
                <img
                  className="w-full"
                  src="/images/cat-img-3.jpg"
                  alt="cat-img-3.jpg"
                />
                <strong className="category-item-title">Watches</strong>
              </Link>
            </div>
          </div>
          <div className="py-5" id="section_product">
            <div>
              <p className="uppercase">Made the hard way</p>
              <h2 className="uppercase mb-4 font-semibold text-lg">
                Big Discount Products
              </h2>
            </div>
            <div className="block">
              <ProductBigSale />
            </div>
          </div>
          <div className="py-5" id="section_product">
            <div>
              <p className="uppercase">Made the hard way</p>
              <h2 className="uppercase mb-4 font-semibold text-lg">
                Product Spend For You
              </h2>
            </div>
            <div className="block">
              <ProductForYou />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
