import React, { useEffect } from 'react'
import Sidebar_com from '../../components/Sidebar_com';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase from 'react-file-base64'
import {  getUserData , getHistoryByUserId } from '@/services/admin'
import Router from 'next/router';
import SearchBox from '@/pages/components/search-box';
import Image from 'next/image';


export async function getStaticProps({ params }) {
    const history_data = await getHistoryByUserId(params.id);
   
    return {
        props: { history_data }
    }
}


export async function getStaticPaths() {
    const userList = await getUserData()

    return {
        paths: userList?.map(user => {
            return {
                params: { id: String(user.id) }
            };
        }),
        fallback: false
    };
}


export default function getListHistorybyUser({ history_data }) {
    
    const [finalData, setProData] = useState(history_data);
   

    return (
        <div className='w-full h-screen flex'>
            <Sidebar_com /> 
            <div className='w-10/12 h-full bg-gray-300 overflow-auto '>
                <div className='w-full p-4  mt-10 mb-4 flex items-center justify-center'>
                    <h1 className='text-4xl font-semibold tracking-widest border-b p-2 uppercase'>History of Users</h1>
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
                                                phone
                                            </th>
                                            
                                            <th scope="col" className="text-2xl font-semibold   py-4 ">
                                                total
                                            </th>
                                            <th scope="col" className="text-2xl font-semibold py-4 ">
                                                status
                                            </th>
                                          
                                            <th scope="col" className="text-2xl font-semibold  py-4 ">
                                                delivery
                                            </th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {
                                            finalData?.map((history) => {
                                                return (
                                                    <tr className="" key={history.id}>
                                                        <td className="py-4 whitespace-nowrap text-sm font-medium  "> 
                                                            {history.fullname}
                                                        </td>
                                                        
                                                        <td className="text-sm font-light  py-4 whitespace-nowrap">
                                                            {history.phone}
                                                        </td>
                                                        
                                                        <td className="text-sm  font-light  py-4 whitespace-nowrap">
                                                            {history.total}
                                                        </td>
                                                      
                                                        <td className="text-sm  font-light  py-4 whitespace-nowrap">
                                                            {history.status}
                                                        </td>

                                                        <td className="text-sm  fonts-light  py-4 whitespace-nowrap">
                                                            {history.delivery}
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