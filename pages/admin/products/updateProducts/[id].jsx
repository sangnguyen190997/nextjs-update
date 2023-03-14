import React, { useEffect } from 'react'
import Sidebar_com from '../../components/Sidebar_com';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase from 'react-file-base64'
import { update_product,  getProductByID , getProductsData, getCategoriesData } from '@/services/admin'
import Router from 'next/router';

import Image from 'next/image';


export async function getStaticProps({ params }) {
    const product_data = await getProductByID(params.id);
   
    return {
        props: { product_data }
    }
}


export async function getStaticPaths() {
    const product = await getProductsData()

    return {
        paths: product?.map(prod => {
            return {
                params: { id: String(prod.id) }
            };
        }),
        fallback: false
    };
}


export default function updateProducts({ product_data }) {
    
    const [proData, setProData] = useState(product_data);
    const [checked, setChecked] = useState(proData.isActive);
    const [formData, setFormData] = useState({ name: proData?.name , price : proData?.price ,  originalPrice : proData?.originalPrice, promotionPercent : proData?.promotionPercent, describe: proData?.describe,  image1: proData?.image1, image2: proData?.image2, image3: proData?.image3, image4: proData?.image4, category  : 2, isActive: proData.isActive} )
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        const res = await update_product(formData, proData.id)
        
        //Tạm thời lấy field ID để kiểm tra có thành công hay ko
        if (res?.id != 'error') {
            toast.success('Success!');
            // Router.push('/admin/products/getProducts');
            // window.location.reload();
        }
        else {
            toast.error(res.error);
        }
        
    }

    const fnCheckBox = (e) => {
        setChecked(!checked)
        setFormData({ ...formData, isActive: checked })     
    }

    return (
        <div className='w-full h-screen flex '>
            <Sidebar_com />
            <div className="w-10/12 min-h-screen flex flex-col items-center justify-center bg-gray-300">
                <div className="max-h-screen flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-5xl">
                    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Update Product</div>
                        <div className="mt-10 max-h-screen">
                        <form onSubmit={handleSubmit} encType="application/json" >
                            <div className='flex flex-row space-x-4'>
                                <div className='w-full'>
                                    {/* <div className="flex flex-col mb-6">
                                        <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Category</label>
                                        <select value={formData.category}  onChange={(e) => setFormData({...formData , category : e.target.value*1})} name="" id="proCategory" className='text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-orange-400'>
                                                {
                                                    cateData?.map((cat) => {
                                                        return( <option className='h-10' >{cat.name}</option>)
                                                    })
                                                }
                                        </select>
                                    </div> */}
                                    <div className="flex flex-col mb-6">
                                        <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Product Name</label>
                                        <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" id="proName" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-orange-400" placeholder="Product name" required />
                                    </div>
                                    
                                    <div className="flex flex-col mb-6">
                                        <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Price</label>
                                        
                                        <input value={formData.price}  onChange={(e) => setFormData({ ...formData, price: e.target.value*1 })} type="number" id="proNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Product price" required />   
                                            
                                       
                                    </div>
                                    
                                    <div className="flex flex-col mb-6">
                                        <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">originalPrice</label>
                                       
                                        <input value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value*1 })} type="number" id="prooriginalPrice" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Originalprice" required />   
                                            
                                        
                                    </div>

                                    <div className="flex flex-col mb-6">
                                        <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">promotionPercent</label>
                                       
                                        <input value={formData.promotionPercent} onChange={(e) => setFormData({ ...formData, promotionPercent: e.target.value*1 })} type="number" id="propromotionPercent" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Discount" required />   
                                            
                                       
                                    </div>          
                                </div>
                                           
                                <div className='w-full'>
                                    <div className="flex flex-col mb-6">
                                    <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Image link 1</label>
                                    
                                    <input value={formData.image1} onChange={(e) => setFormData({ ...formData, image1: e.target.value })} type="text" id="imageLink1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Image link" required />
                                        
                                    
                                </div>

                                <div className="flex flex-col mb-6">
                                    <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Image link 2</label>
                                    
                                    <input value={formData.image2} onChange={(e) => setFormData({ ...formData, image2: e.target.value })} type="text" id="imageLink2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Image link" required />
                                        
                                    
                                </div>

                                <div className="flex flex-col mb-6">
                                    <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Image link 3</label>
                                   
                                    <input value={formData.image3} onChange={(e) => setFormData({ ...formData, image3: e.target.value })} type="text" id="imageLink3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Image link" required />
                                        
                                    
                                </div> 
                                
                                <div className="flex flex-col mb-6">
                                    <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Image link 4</label>
                                    <input value={formData.image4} onChange={(e) => setFormData({ ...formData, image4: e.target.value })} type="text" id="imageLink4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Image link" required />
                                </div> 

                                <div className="flex flex-col mb-6">
                                    <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Description</label>
                                    <textarea value={formData.describe} onChange={(e) => setFormData({...formData , describe   : e.target.value }) } id="proDes" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Product description"></textarea>
                                </div>

                                <div class="flex flex-row space-x-1 mb-6">
                                    <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Active</label>
                                    <input type="checkbox" defaultChecked={checked} onChange={(e) => fnCheckBox(e)} />
                                </div>
                                </div>          
                            </div>
                                           
                            <div className="flex w-full">
                                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 rounded py-2 w-full transition duration-150 ease-in">
                                    <span className="mr-2 uppercase">Save</span>
                                </button>
                            </div>
                        </form>
                        </div>
                    
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}