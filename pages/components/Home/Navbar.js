import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Router, { useRouter } from "next/router";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import "react-tooltip/dist/react-tooltip.css";
import Cookies from "js-cookie";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const Router = useRouter();
  const user = useSelector((state) => state.auth.login.currentUser);

  const logout = () => {
    localStorage.removeItem("ACESS_TOKEN");
    localStorage.removeItem("persist:root");
    Router.push("/login");
    window.location.reload();
  };

  return (
    <div className="bg-slate-900 w-full z-20 h-24  text-white flex justify-around t-0 l-0">
      <div className=" h-full  flex items-center justify-start px-4">
        <Image
          width={150}
          height={150}
          alt="Logo"
          src="/logo.png"
          className=" mx-4 cursor-pointer"
          onClick={() => Router.push("/")}
        />
      </div>
      <div className=" h-full flex item-center  justify-center px-4">
        <ul className="w-full h-full flex items-center justify-center">
          <Link
            href="/"
            className="mx-4 p-2  text-lg cursor-pointer transition-all duration-500 hover:text-orange-600"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="mx-4 p-2  text-lg cursor-pointer transition-all duration-500 hover:text-orange-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="mx-4 p-2  text-lg cursor-pointer transition-all duration-500 hover:text-orange-600"
          >
            Contact
          </Link>
          <Link
            href="/productpage"
            className="mx-4 p-2  text-lg cursor-pointer transition-all duration-500 hover:text-orange-600"
          >
            Products
          </Link>
        </ul>
      </div>
      <div className=" h-full  flex items-center  justify-around px-4">
        <AiOutlineShoppingCart
          onClick={() => Router.push("/cart")}
          className="text-2xl  mx-4 hover:text-orange-600 transition-all duration-500 cursor-pointer"
        />
        {/* {curUser ? (
          <BiLogOut
            id="logout"
            className="text-2xl  mx-4  hover:text-orange-600 transition-all duration-500 cursor-pointer"
            onClick={logout}
          />
        ) : (
          <BiLogIn
            id="login"
            className="text-2xl  mx-4  hover:text-orange-600 transition-all duration-500 cursor-pointer"
            onClick={() => Router.push("/login")}
          />
        )} */}
        {user ? (
          <div>
            <div className="dropdown inline-block relative">
              <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                <span className="mr-1">Hi, {user.fullname}</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </button>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 z-40">
                <li className="">
                  <a
                    className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    href="#"
                    onClick={() => Router.push("/profile")}
                  >
                    Profile
                  </a>
                </li>
                <li className="">
                  <a
                    className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    href="#"
                    onClick={() => Router.push("/history")}
                  >
                    History
                  </a>
                </li>
                <li className="">
                  <a
                    className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    href="#"
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <BiLogIn
            id="login"
            className="text-2xl  mx-4  hover:text-orange-600 transition-all duration-500 cursor-pointer"
            onClick={() => Router.push("/login")}
          />
        )}
      </div>
      {/* <ReactTooltip
        anchorId="login"
        place="bottom"
        variant="info"
        content="LOGIN"
      />
      <ReactTooltip
        anchorId="logout"
        place="bottom"
        variant="info"
        content="LOGOUT"
      /> */}
    </div>
  );
}
