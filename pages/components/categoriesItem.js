import { getCategory } from "@/services/categoryApi";
import { Icon } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function CategoriesItem({ category }) {
  const [idProduct, setIdProduct] = useState();
  const handleCategory = (id) => {
    setIdProduct(id);
  };
  return (
    <li key={category.id}>
      <a onClick={() => handleCategory(category.id)}>
        <div className="content">
          <div className="icon">
            <Icon color="#D8D8D8" size="22" />
          </div>
          <p>{category.name}</p>
        </div>
        <div className="arrow-button">
          <MdKeyboardArrowRight color="#D8D8D8" size="26" />
        </div>
      </a>

      <style jsx>{`
        li a {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 18px;
          text-decoration: none;
          font-weight: 500;
          font-size: 13px;
          color: #808080;
          border-bottom: 2px solid #f5f5f5;
          transition: 0.4s;
        }
        li a:hover {
          background: #f2f2f2;
        }
        li a .content {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        li a .content .icon {
          padding-right: 18px;
        }
        li a .arrow-button {
          align-self: flex-end;
        }
      `}</style>
    </li>
  );
}
