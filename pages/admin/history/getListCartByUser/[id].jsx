import React, { useEffect } from 'react'
import Sidebar_com from '../../components/Sidebar_com';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase from 'react-file-base64'
import {  getUserData , getHistoryByUserId, getCartByUserId } from '@/services/admin'
import Router from 'next/router';
import SearchBox from '@/pages/components/search-box';
import Image from 'next/image';


export async function getStaticProps({ params }) {
    const history_data = await getCartByUserId(params.id);
   
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
    console.log(history_data)

    return (
        <div className='w-full h-screen flex'>
            <Sidebar_com /> 
            <div className='w-10/12 h-full bg-gray-300 overflow-auto '>
                <div className='w-full p-4  mt-10 mb-4 flex items-center justify-center'>
                    <h1 className='text-4xl font-semibold tracking-widest border-b p-2 uppercase'>Cart</h1>
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
                                                Product Name
                                            </th>
                                            <th scope="col" className="text-2xl font-semibold py-4 ">
                                                Price
                                            </th>
                                            
                                            <th scope="col" className="text-2xl font-semibold   py-4 ">
                                                Quantity
                                            </th>
                                            <th scope="col" className="text-2xl font-semibold py-4 ">
                                                Image
                                            </th>
                                          
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {
                                            finalData?.map((history) => {
                                                return (
                                                    <tr className="" key={history.id}>
                                                        <td className="py-4 whitespace-nowrap text-sm font-medium  "> 
                                                            {history.nameProduct}
                                                        </td>
                                                        
                                                        <td className="text-sm font-light  py-4 whitespace-nowrap">
                                                            {history.priceProduct}
                                                        </td>
                                                        
                                                        <td className="text-sm  font-light  py-4 whistespace-nowrap">
                                                            {history.count}
                                                        </td>       
                                                      
                                                        <td className="text-sm  flex items-center justify-center font-light py-4 whitespace-nowrap">
                                                            <Link href={product.image1} legacyBehavior>
                                                                <img className="product-img" src={history.img} alt='Product Image'/>
                                                            </Link>
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