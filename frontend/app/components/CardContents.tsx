import React from "react";

const CardContents = ({ data, children }) => {
  const { firstName, lastName, email, skills } = data;
  return (
    <div className="flex justify-center my-4">
      <div className="card card-border bg-sky-50 text-info-content w-96 shadow-sm">
        <div className="card-body flex flex-col justify-start gap-2">
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://in.bmscdn.com/iedb/artist/images/website/poster/large/rajnandini-paul-1094578-31-07-2018-03-27-04.jpg" />
              </div>
            </div>
            <div className="ml-3">
              <h6 className="card-title text-sm">
                {firstName + " " + lastName}
              </h6>
              <div className="text-xs">Email : {email}</div>
              <p className="text-xs">Skills : {skills.join(", ")}</p>
            </div>
          </div>
        </div>
        <div className="m-3">{children}</div>
      </div>
    </div>
  );
};

export default CardContents;
