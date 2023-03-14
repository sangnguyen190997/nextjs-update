import React, { useEffect, useState } from 'react'


export default function Profile() {
    const [name, setName] = useState(undefined)
    const [email, setEmail] = useState(undefined)



    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('user'))
    //     setName(data?.name)
    //     setEmail(data?.email)
    // }, [])


    return (
    <div classname="w-10/12 h-full text-white px-4 flex items-center justify-start flex-col">
  <div classname="w-full p-4  mt-10 mb-4 flex items-center justify-center">
    <h1 classname="text-4xl font-semibold tracking-widest border-b p-2 uppercase">WELCOME {'{'}`Admin`{'}'} </h1>
  </div>
  <div classname="container w-8/12  p-4 ">
    <div classname=" flex px-2 items-center justify-center w-full h-full ">
      <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">2d ago</span>
          <span className="text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </span>
        </div>
        <div className="mt-6 w-fit mx-auto">
          <img src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe" className="rounded-full w-28 " alt="profile picture" srcSet />
        </div>
        <div className="mt-8 ">
          <h2 className="text-white font-bold text-2xl tracking-wide">{'{'}name{'}'} </h2>
        </div>
        <p className="text-emerald-400 font-semibold mt-2.5">
          Active
        </p>
        <div className="h-1 w-full bg-black mt-8 rounded-full">
          <div className="h-1 rounded-full w-2/5 bg-yellow-500 " />
        </div>
        <div className="mt-3 text-white text-sm">
          <span className="text-gray-400 font-semibold">Authority:</span>
          <span>40%</span>
        </div>
      </section>
    </div>
  </div>
    </div>

    )
}
