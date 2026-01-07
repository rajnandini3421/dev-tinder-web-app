"use client";
import React, { useEffect } from "react";
import Navbar from "../navbarPage";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setIsUserAuthenticated,
  setUserAuthData,
} from "../redux/slices/userAuth";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
const AppLayout = ({ children }) => {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    if (userInfo) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        withCredentials: true,
      });
      if (response.data) {
        console.log("User details fetched", response.data);
        setIsUserAuthenticated(true);
        dispatch(setUserAuthData(response.data.data));
      }
    } catch (err) {
      router.push("/login");
      console.log("Error fetching user details", err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="bg-cover bg-center bg-no-repeat flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
