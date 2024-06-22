import Link from "next/link";
import React from "react";

const CancelBtn = () => {
  return (
    <div className="">
      <Link
        href="/"
        className="text-lg font-semibold bg-primaryRed text-white rounded-full py-2.5 px-8 hover:opacity-80 transition duration-200"
      >
        Cancel
      </Link>
    </div>
  );
};

export default CancelBtn;