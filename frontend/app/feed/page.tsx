"use client";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { setFeedUsers } from "../redux/slices/feed.slice";

const Feed = () => {
  const { feedUsers } = useSelector((state) => state.feedReducer);
  const [currentFeedUser, setCurrentFeedUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getFeedUsers();
  }, []);

  useEffect(() => {
    setCurrentFeedUser(feedUsers[0] || null);
  }, [feedUsers]);
  console.log("feedUsers in page", feedUsers);
  const getFeedUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/feed`, {
        withCredentials: true,
      });
      if (response.data) {
        dispatch(setFeedUsers(response.data.data));
        console.log("Feed users fetched", response.data.data);
        // Dispatch action to set feed users in Redux store
      }
    } catch (err) {
      console.log("Error fetching feed users", err);
    }
  };

  const handleFeedRequest = async (userId, action) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/request/send/${action}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // alert(`User ${action} successfully`);
        // Remove the processed user from the feed
        const updatedFeedUsers = feedUsers.filter(
          (user) => user._id !== userId
        );
        dispatch(setFeedUsers(updatedFeedUsers));
      }
    } catch (err) {
      console.log("Error in feed request", err);
    }
  };
  console.log("Feed Users:", feedUsers);
  return (
    <div>
      {/* {feedUsers.map((user, key) => ( */}
      <div className="flex justify-center my-4 min-h-96">
        <div className="card bg-base-300 text-info-content w-96 ">
          <div className="card-body items-center">
            <div className="avatar mb-4">
              <div className="w-36 rounded-xl">
                <img src="https://in.bmscdn.com/iedb/artist/images/website/poster/large/rajnandini-paul-1094578-31-07-2018-03-27-04.jpg" />
              </div>
            </div>
            <h2 className="card-title">
              {currentFeedUser?.firstName} {currentFeedUser?.lastName}
            </h2>
            <div>Email: {currentFeedUser?.email}</div>
            <p>Skills : {currentFeedUser?.skills.join(", ")}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-error"
                onClick={() =>
                  handleFeedRequest(currentFeedUser?._id, "ignored")
                }
              >
                Ignore
              </button>
              <button
                className="btn btn-success"
                onClick={() =>
                  handleFeedRequest(currentFeedUser?._id, "interested")
                }
              >
                Intrested
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};

export default Feed;
