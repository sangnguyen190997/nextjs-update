import Image from 'next/image'
import queryString from "query-string";
import React, { useEffect, useState } from 'react'
import Sidebar_com from '../components/Sidebar_com'
import { delete_Product, getProductsData, getProducts_PaginationData } from '@/services/admin'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import offlineProducts from '@/pages/db/offlineData/products';
import SearchBox from '@/pages/components/search-box';
import Pagination from "@mui/material/Pagination";

export async function getStaticProps() {
   
   
    const data = await getProductsData() || [];
    return {
        props: { data }
    }

}


export default function getProducts({data}) {
    const [finalData, setFinalData] = useState();
    const [pagination, setPagination] = useState({
        page: "1",
        size: "5",
        search: "",
        category: "all",
    });
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    
    useEffect(() => {
        (async () => {
        const params = {
            page: pagination.page,
            size: pagination.size,
        };
        const query = queryString.stringify(params);
        const productData_Pagination = await getProducts_PaginationData(query) || [];
        console.log(productData_Pagination)
        setFinalData(productData_Pagination)
        })();
    }, [pagination, page]);

    useEffect(() => {
        
        let totalProduct = data?.length;
        totalProduct = Math.ceil(totalProduct / pagination.size);
        setTotalPage(totalProduct);
    }, [page, pagination]);

    //Xử lý khi chọn trang
    const handleChangePage = (e, value) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    
        setPage(value);
    
        setPagination({
          page: value,
          size: pagination.size,
          search: pagination.search,
          category: pagination.category,
        });
    };

    //Xử lý xóa sp
    const handleDelete = async (id) => {
        const data = await delete_Product(id);
        
        if (data.message) {
            toast.success(data.message);
            window.location.reload()
        }
        else {
            toast.error(data.error + '-' + data.message)
        }
    }

    return (
        <div className='w-full h-screen flex'>
            <Sidebar_com /> 
            <div className='w-10/12 h-full bg-gray-300 overflow-auto '>
                <div className='w-full p-4  mt-10 mb-4 flex items-center justify-center'>
                    <h1 className='text-4xl font-semibold tracking-widest border-b p-2 uppercase'>List of Products</h1>
                </div>
                <div className='flex px-10'> 
                    <div >
                        <SearchBox />   
                    </div>
                </div>
                <div className='px-10'>
                    <div className="overflow-y-auto  sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full ">
                            <div className="overflow-hidden">
                               
                                <table className="table-auto min-w-full text-center">
                                    <thead className="">
                                        <tr>
                                            <th scope="col" className="text-2xl font-semibold py-4  ">
                                                Name
                                            </th>
                                            <th scope="col" className="text-2xl font-semibold py-4 ">
                                                price
                                            </th>
                                            
                                            <th scope="col" className="text-2xl font-semibold   py-4 ">
                                                Active
                                            </th>
                                            <th scope="col" className="text-2xl font-semibold py-4 ">
                                                Image 1
                                            </th>
                                          
                                            <th scope="col" className="text-2xl font-semibold  py-4 ">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {
                                            finalData?.map((product) => {
                                                return (
                                                    <tr className="" key={product.id}>
                                                        <td className="py-4 whitespace-nowrap text-sm font-medium  "> {product.name}</td>
                                                        
                                                        <td className="text-sm font-light  py-4 whitespace-nowrap">
                                                        {product.price}
                                                        </td>
                                                        
                                                        <td className="text-sm  font-light  py-4 whitespace-nowrap">
                                                            {product.isActive === true ? "YES" : "NO"}
                                                        </td>
                                                        <td className="text-sm  flex items-center justify-center font-light py-4 whitespace-nowrap">
                                                            <Link href={product.image1} legacyBehavior>
                                                                <img className="product-img" src={product.image1} alt='Product Image'/>
                                                            </Link>
                                                        </td>
                                                      
                                                        <td>
                                                            <Link href={`updateProducts/${product.id}`} className="bg-orange-500 mx-2 hover:bg-orange-900   font-bold py-2 px-4 rounded-full">Update</Link>
                                                            <button onClick={() => handleDelete(product.id)} className="bg-red-500 mx-2 hover:bg-red-900   font-bold py-2 px-4 rounded-full">Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })


                                        }

                                    </tbody>
                                </table>
                                <Pagination
                                    count={totalPage}
                                    page={page}
                                    onChange={handleChangePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
            <style jsx>{
                    `  .product-img {
                        width: 110px;
                        height: 110px;
                        object-fit: contain;
                    }
                `
            }</style>
        </div>
        
    )
}
