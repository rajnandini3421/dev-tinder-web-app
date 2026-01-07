import React from "react";

const LoadingBar = () => {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-blue-500 border-gray-200"></div>
        <div className="text-sm text-gray-600">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingBar;
