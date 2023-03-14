
import Link from 'next/link';
import {
  FaCartArrowDown,
  FaCartPlus,
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { toggleCart, toggleWishlist } from '../../utils/toggleProductStates';


export default function ProductSectionCart({ id, name, rating, img_url, price }) {
  
  let [num, setNum]= useState(0);
  let incNum =()=>{
    if(num<10)
    {
      setNum(Number(num)+1);
    }
  };
  let decNum = () => {
     if(num>0)
     {
      setNum(num - 1);
     }
  }
 let handleChange = (e)=>{
   setNum(e.target.value);
  }
  
  return (
    <article>
      
      <div className="grow product-img-box">
        <Link href={`/product/${id}`} legacyBehavior>
          <img className="product-img" src={img_url} />
        </Link>
      </div>

      <div className="grow product-content">
      <Link href={`/product/${id}`} legacyBehavior>
        <a className="product-name">{name}</a>
      </Link>

      <div className="rating">
        <StarRatings
          rating={parseFloat(rating)}
          starRatedColor="#F9AD3D"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="1px"
        />
      </div>

      <div className="price">
        <p className="price-value">${price}</p>
        <button className="add-cart" onClick={() => toggleCart(id)}>
          {/* {cart.data.cart.products.includes(id) && (
            <FaCartArrowDown size={18} color="#D8D8D8" />
          )}
          {!cart.data.cart.products.includes(id) && (
            <FaCartPlus size={18} color="#D8D8D8" />
          )} */}
        </button>
      </div>
      </div>
      
      <div className="grow-0 product-numeric-input">
        <div className="custom-number-input h-10 w-32">
         
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                 onClick={decNum}>
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>

                  <input type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" 
                  name="custom-input-number" value={num} onChange={handleChange}></input>

                <button data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                 onClick={incNum}>
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
          </div>
        </div>
      </div>

      
      <style jsx>{`
        article {
          display: flex;
          align-items: center;
          flex-direction: row;
          box-sizing: border-box;
          height: 100%;
          padding: 24px;
          background: white;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
          border-radius: 6px;
        }
        .product-content {
          display: flex;
          align-items: center;
          flex-direction: column;
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
          width: 25%;
        }
        .product-img {
          width: 100%;
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

        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .custom-number-input input:focus {
          outline: none !important;
        }

        .custom-number-input button:focus {
          outline: none !important;
        }
      `}</style>     
      
    </article>
    
  );
}
