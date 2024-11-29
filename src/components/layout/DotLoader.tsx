import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function DotLoader() {
  return (
    <div className="flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="25"
        width="25"
        color="#fff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
