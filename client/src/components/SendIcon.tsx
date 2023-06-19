import React from "react";

const SendIcon = ({ handleClick }: { handleClick: any }) => {
  return (
    <div
      className="bg-[#865DFF] p-2 w-14 h-14 rounded-md cursor-pointer transition-opacity hover:opacity-90"
      onClick={handleClick}
    >
      <svg
        fill="#fff"
        viewBox="-2.4 -2.4 28.80 28.80"
        id="cursor-right"
        data-name="Flat Line"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-line"
        stroke="#fff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="0.24000000000000005"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            id="secondary"
            d="M3.21,17.16,6.63,12,3.21,6.84A1.14,1.14,0,0,1,4.44,5.07l15.92,6a1,1,0,0,1,0,1.88l-15.92,6A1.14,1.14,0,0,1,3.21,17.16Z"
            style={{ fill: "#ffffff", strokeWidth: 2 }}
          ></path>
          <path
            id="primary"
            d="M3.21,17.16,6.63,12,3.21,6.84A1.14,1.14,0,0,1,4.44,5.07l15.92,6a1,1,0,0,1,0,1.88l-15.92,6A1.14,1.14,0,0,1,3.21,17.16Z"
            style={{
              fill: "none",
              stroke: "#ffffff",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default SendIcon;
