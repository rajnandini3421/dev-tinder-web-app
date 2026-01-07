"use client";
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setConnections,
  setConnectionsLoading,
} from "../redux/slices/connections.slice";
import LoadingBar from "../components/LoadingBar";
import CardEmptyData from "../components/CardEmptyData";
import CardSkeleton from "../components/CardSkeleton";

const Connections = () => {
  const dispatch = useDispatch();
  const { connections, isConnectionsLoading } = useSelector(
    (state) => state.connectionReducer
  );
  const { userInfo } = useSelector((state) => state.authReducer);
  useEffect(() => {
    getConnections();
  }, []);

  const getConnections = async () => {
    try {
      dispatch(setConnectionsLoading(true));
      const response = await axios.get(`${API_BASE_URL}/connections`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setConnections(response.data.data));
        console.log("Connections fetched", response.data.data);
      }
    } catch (err) {
      console.log("Error fetching connections", err);
    } finally {
      dispatch(setConnectionsLoading(false));
    }
  };

  return (
    <div className="min-h-96">
      <>
        {isConnectionsLoading ? (
          <CardSkeleton />
        ) : !connections?.length ? (
          <CardEmptyData />
        ) : (
          connections?.map((connection: any) => (
            <div key={connection._id} className="flex justify-center my-4">
              <div className="card bg-sky-50 text-info-content w-96 shadow-sm">
                <div className="card-body flex flex-col justify-start gap-2">
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src="https://in.bmscdn.com/iedb/artist/images/website/poster/large/rajnandini-paul-1094578-31-07-2018-03-27-04.jpg" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h6 className="card-title text-sm">
                        {connection?.fromUserId._id === userInfo?._id
                          ? connection?.toUserId?.firstName +
                            " " +
                            connection?.toUserId?.lastName
                          : connection?.fromUserId?.firstName +
                            " " +
                            connection?.fromUserId?.lastName}
                      </h6>
                      <div className="text-xs">
                        Email :{" "}
                        {connection?.fromUserId._id === userInfo?._id
                          ? connection?.toUserId?.email
                          : connection?.fromUserId?.email}
                      </div>
                      <p className="text-xs">
                        Skills :{" "}
                        {connection?.fromUserId._id === userInfo?._id
                          ? connection?.toUserId?.skills.join(", ")
                          : connection?.fromUserId?.skills.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </>
      {/* {isConnectionsLoading ? <LoadingBar /> : null} */}
    </div>
  );
};

export default Connections;
