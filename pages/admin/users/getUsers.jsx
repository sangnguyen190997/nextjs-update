import Image from 'next/image'
import queryString from "query-string";
import React, { useEffect, useState } from 'react'
import Sidebar_com from '../components/Sidebar_com'
import {  getProducts_PaginationData, getUserData, deleteUser } from '@/services/admin'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import SearchBox from '@/pages/components/search-box';
import Pagination from "@mui/material/Pagination";

export async function getStaticProps() {
   
   
    const data = await getUserData() || [];
    return {
        props: { data }
    }

}


export default function getUsers({data}) {
    const [finalData, setFinalData] = useState(data);

    const changePage = (id) => {
        Router.push('getListHistorybyUser/' + id);
    }
   

   

    return (
        <div className='w-full h-screen flex'>
            <Sidebar_com /> 
            <div className='w-10/12 h-full bg-gray-300 overflow-auto '>
                <div className='w-full p-4  mt-10 mb-4 flex items-center justify-center'>
                    <h1 className='text-4xl font-semibold tracking-widest border-b p-2 uppercase'>List of Users</h1>
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
                                                Email
                                            </th>
                                           
                                            <th scope="col" className="text-2xl font-semibold py-4 ">
                                                Phone
                                            </th>
                                          
                                            <th scope="col" className="text-2xl font-semibold  py-4 ">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {
                                            finalData?.map((user) => {
                                                return (
                                                    <tr className="" key={user.id}>
                                                        <td className="py-4 whitespace-nowrap text-sm font-medium  "> {user.fullname}</td>
                                                        
                                                        <td className="text-sm font-light  py-4 whitespace-nowrap">
                                                            {user.email}
                                                        </td>
                                                       
                                                        <td className="text-sm font-light  py-4 whitespace-nowrap">
                                                            {user.phone}
                                                        </td>
                                                      
                                                        <td>
                                                        <button onClick={() => changePage(user.id)} class="bg-red-500 mx-2 hover:bg-red-900   font-bold py-2 px-4 rounded-full">Order History</button>
                                                            {/* <Link href={`getListHistorybyUser/${user.id}`} classNName="bg-orange-500 mx-2 hover:bg-orange-900   font-bold py-2 px-4 rounded-full">Order History</Link> */}
                                                            {/* <button onClick={() => handleDelete(user.id)} class="bg-red-500 mx-2 hover:bg-red-900   font-bold py-2 px-4 rounded-full">Delete</button> */}
                                                        </td>
                                                    </tr>
                                                )
                                            })


                                        }

                                    </tbody>
                                </table>
                             
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
          
        </div>
        
    )
}
