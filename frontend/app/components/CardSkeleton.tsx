import React from "react";

const CardSkeleton = () => {
  return (
    <div className="flex justify-center my-4 min-h-96">
      <div className="flex w-94 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-20 w-20 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
