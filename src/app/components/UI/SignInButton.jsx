"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const SignInBtn = () => {
  return (
    <div className="flex items-center border-2 border-gray-800 pr-3.5 rounded-full hover:bg-gray-100 transition duration-200">
      <Image
        src="/images/google-logo.webp"
        width={36}
        height={36}
        alt="google logo"
        className=" py-2.5 pr-1 pl-3 rounded-full"
      />
      <button
        className="font-semibold text-gray-700 text-lg"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        SignIn with Google
      </button>
    </div>
  );
};

export default SignInBtn;