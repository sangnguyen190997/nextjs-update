import queryString from "query-string";
import ProductItem from "./productItem";
import ProductsGrid from "./productsGrid";
import offlineProducts from "../db/offlineData/products";
import LoadingPage from "./loading-page";
import { Fragment, useEffect, useState } from "react";
import {
  getListProductFilter,
  getListProductPanigation,
  getProduct,
} from "@/services/productApi";
import Pagination from "@mui/material/Pagination";
import { getCategory } from "@/services/categoryApi";
import { Icon } from "@mui/material";
import { MdKeyboardArrowRight } from "react-icons/md";
import HeaderBarProducts from "./headerBarProducts";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pagination, setPanigation] = useState({
    page: "1",
    size: "9",
    categoryId: "7",
    keyWordSearch: "",
  });
  const [finalData, setFinalData] = useState([]);
  const [sort, setSort] = useState("Default");

  useEffect(() => {
    setPage(1);
  }, [pagination.categoryId]);

  useEffect(() => {
    (async () => {
      const params = {
        page: page,
        size: pagination.size,
        categoryId: pagination.categoryId,
        keyWordSearch: pagination.keyWordSearch,
      };

      const query = queryString.stringify(params);
      const newQuery = "?" + query;
      const res = await getListProductPanigation(newQuery);
      setProducts(res);
    })();
  }, [pagination, products]);

  useEffect(() => {
    (async () => {
      let res;
      res = await getProduct();
      if (pagination.categoryId == "7") {
        res = await getProduct();
      } else {
        const params = {
          page: "",
          size: "",
          categoryId: pagination.categoryId,
          keyWordSearch: pagination.keyWordSearch,
        };

        const query = queryString.stringify(params);
        const newQuery = "?" + query;

        res = await getListProductPanigation(newQuery);
      }
      const newToTalPage = Math.ceil(
        Number(res.length) / Number(pagination.size)
      );

      setTotalPage(newToTalPage);
    })();
  }, [pagination, page]);

  const handleChangePage = (e, value) => {
    e.preventDefault();
    setPage(value);

    window.scrollTo(0, 0);
    setPanigation({
      page: value,
      size: pagination.size,
      categoryId: pagination.categoryId,
      keyWordSearch: pagination.keyWordSearch,
    });
  };

  useEffect(() => {
    (async () => {
      const data = await getCategory();
      setFinalData(data);
    })();
  }, []);

  const handleCategory = (id) => {
    setPanigation({
      page: pagination.page,
      size: pagination.size,
      keyWordSearch: pagination.keyWordSearch,
      categoryId: id,
    });
  };

  const handleSort = (value) => {
    setSort(value);
  };
  return (
    <Fragment>
      <div className="flex">
        <div className="px-5">
          {finalData?.map((item) => {
            return (
              <Fragment key={item.id}>
                <li className="list-none hover:cursor-pointer">
                  <a onClick={() => handleCategory(item.id)}>
                    <div className="content">
                      <div className="icon">
                        <Icon color="#D8D8D8" size="22" />
                      </div>
                      <p>{item.name}</p>
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
              </Fragment>
            );
          })}
        </div>
        <div>
          <HeaderBarProducts handleSort={handleSort} />
          <ProductItem products={products} />
          <div className="my-10 flex justify-center">
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
