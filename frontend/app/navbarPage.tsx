"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "./utils/constants";
import {
  removeUserAuthData,
  setIsUserAuthenticated,
  setUserAuthData,
} from "./redux/slices/userAuth";
import Link from "next/link";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Logout response", response);
      if (response.data.success) {
        dispatch(removeUserAuthData());
        router.push("/login");
      }
    } catch (err) {
      console.log("Error logging out", err);
    }
  };
  return (
    <div className="flex">
      <div
        className="navbar bg-gradient-to-bl from-sky-900  to-cyan-500 
             shadow-sm"
      >
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">👩‍💻 Dev tinder</a>
        </div>

        <div className="flex gap-2 text-white items-center">
          {userInfo ? `Welcome ${userInfo?.firstName}!` : null}
          {/* <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          /> */}
          <div className="dropdown dropdown-end mx-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-sky-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link href={"/feed"}>Feed</Link>
              </li>
              <li>
                <Link href={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link href={"/requests"}>Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
