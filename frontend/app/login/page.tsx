"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import {
  setIsUserAuthenticated,
  setUserAuthData,
} from "../redux/slices/userAuth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { get } from "http";
const LoginPage = () => {
  const [username, setUsername] = useState<string | null>("");
  const [password, setPassword] = useState("");
  const { userInfo, isUserAuthenticated } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("in LoginPage added for testing", userInfo, isUserAuthenticated);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitClick = async () => {
    let payload = {
      email: username,
      password: password,
    };
    console.log("inputttttttt", username, password);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, payload, {
        withCredentials: true,
      });
      if ((response.status = 200)) {
        console.log("response is", response);
        // alert("Login Successful");

        dispatch(setUserAuthData(response.data.data));
        dispatch(setIsUserAuthenticated(true));
        router.push("/feed");
      }
    } catch (err: any) {
      alert(err.response?.data || "Login Failed");
      console.log("In error", err);
    }
  };

  return (
    // <div className="flex flex-col justify-center">

    //   <button className="btn btn-primary btn-wide">Login</button>
    // </div>
    <div className="bg-[url('../public/bg-dev.jpg')] bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center min-h-screen w-full">
      <div className="flex flex-col card bg-base-100shadow-sm justify-center ">
        <div className="avatar justify-center">
          <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
        <input
          type="text"
          placeholder="Username"
          className="input my-2"
          value={username}
          onChange={handleUsernameChange}
        />

        <input
          type="password"
          required
          placeholder="Password"
          className="input "
          value={password}
          onChange={handlePasswordChange}
          minLength={8}
          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
        />
        {/* <p className="validator-hint ">
          Must be more than 8 characters,
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p> */}
        <div className="card-actions my-2">
          <button
            className="btn btn-primary btn-wide"
            onClick={handleSubmitClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
