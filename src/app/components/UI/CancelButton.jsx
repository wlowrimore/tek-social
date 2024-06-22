import Link from "next/link";
import React from "react";

const CancelBtn = () => {
  return (
    <div className="">
      <Link
        href="/"
        className="text-lg font-semibold"
      >
        Cancel
      </Link>
    </div>
  );
};

export default CancelBtn;