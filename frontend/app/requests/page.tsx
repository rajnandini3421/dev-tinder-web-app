"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../redux/slices/request.slice";
import { API_BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requestReducer);

  useEffect(() => {
    getAllReceivedRequests();
  }, []);

  const getAllReceivedRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/requests/received`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setRequests(response.data.data));
        console.log("Requests fetched", response.data.data);
      }
    } catch (err) {
      console.log("Error fetching requests", err);
    }
  };

  const handleReceivedRequest = async (requestId, action) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/request/review/${action}/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response from review request:", response.data);
      if (response.data.success) {
        console.log("Updated Requests before:", requests);

        let updatedRequests = requests.filter((item) => item._id !== requestId);
        console.log("Updated Requests:", updatedRequests);
        dispatch(setRequests(updatedRequests));
        console.log(`Request ${action} successfully`);
      }
    } catch (err) {
      console.log("Error responding to request", err);
    }
  };

  console.log("Requests in component", requests);
  return (
    <div>
      {requests.map((request: any) => (
        <div className="flex justify-center my-4 min-h-96">
          <div key={request._id} className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">
                {request.fromUserId.firstName} {request.fromUserId.lastName}
              </h2>
              <div>Email: {request.fromUserId.email}</div>
              <p>Skills : {request.fromUserId.skills.join(", ")}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-error"
                  onClick={() =>
                    handleReceivedRequest(request?._id, "rejected")
                  }
                >
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    handleReceivedRequest(request?._id, "accepted")
                  }
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
