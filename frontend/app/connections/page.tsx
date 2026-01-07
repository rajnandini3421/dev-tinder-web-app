"use client";
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../redux/slices/connections.slice";

const Connections = () => {
  const dispatch = useDispatch();
  const { connections } = useSelector((state) => state.connectionReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  useEffect(() => {
    getConnections();
  }, []);

  const getConnections = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/connections`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setConnections(response.data.data));
        console.log("Connections fetched", response.data.data);
      }
    } catch (err) {
      console.log("Error fetching connections", err);
    }
  };

  return (
    <div>
      {connections?.map((connection: any) => (
        <div key={connection._id} className="flex justify-center my-4 min-h-96">
          <div className="card bg-base-300 text-info-content w-96 ">
            <div className="card-body items-center">
              <div className="avatar mb-4">
                <div className="w-36 rounded-xl">
                  <img src="https://in.bmscdn.com/iedb/artist/images/website/poster/large/rajnandini-paul-1094578-31-07-2018-03-27-04.jpg" />
                </div>
              </div>
              <h2 className="card-title">
                {connection?.fromUserId._id === userInfo?._id
                  ? connection?.toUserId?.firstName +
                    " " +
                    connection?.toUserId?.lastName
                  : connection?.fromUserId?.firstName +
                    " " +
                    connection?.fromUserId?.lastName}
              </h2>
              <div>
                Email:
                {connection?.fromUserId._id === userInfo?._id
                  ? connection?.toUserId?.email
                  : connection?.fromUserId?.email}{" "}
              </div>
              <p>
                Skills :{" "}
                {connection?.fromUserId._id === userInfo?._id
                  ? connection?.toUserId?.skills.join(", ")
                  : connection?.fromUserId?.skills.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
