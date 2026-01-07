import React from "react";

const CardEmptyData = () => {
  return (
    <div className="flex justify-center my-4 min-h-96">
      <div className="card card-border bg-sky-50 w-full mx-20">
        <div className="card-body flex items-center justify-center">
          <div className="avatar">
            <div className="w-24 rounded">
              <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" />
            </div>
          </div>

          <h2 className="card-title">No Data Found</h2>
        </div>
      </div>
    </div>
  );
};

export default CardEmptyData;
