// import CategoriesItem from "./categoriesItem";

import offlineCategories from "../db/offlineData/categories";
import { Fragment, useEffect, useState } from "react";
import { getCategory } from "@/services/categoryApi";
import CategoriesItem from "./categoriesItem";

export default function AsideCategories({ categories }) {
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getCategory();
      setFinalData(data);
    })();
  }, []);
  return (
    <ul className="categories">
      {finalData.map((category) => {
        return (
          <Fragment key={category.id}>
            <CategoriesItem key={category.id} category={category} />;
          </Fragment>
        );
      })}

      <style jsx>{`
        .categories {
          width: 255px;
          max-width: 255px;
          background: #ffff;
          border-radius: 6px;
          margin-bottom: 30px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
        }
        @media (max-width: 1000px) {
          .categories {
            display: none;
          }
        }
      `}</style>
    </ul>
  );
}
