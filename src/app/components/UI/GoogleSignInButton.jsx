"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const SignInBtn = () => {
  return (
    <div className="flex items-center px-4 py-2.5">
      <Image
        src="/images/google-logo.webp"
        width={70}
        height={70}
        alt="google logo"
        className="relative right-1 py-2.5 pl-3 rounded-full opacity-70"
      />
      <button
        className="absolute font-bold text-gray-700 text-2xl"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        SignIn
      </button>
    </div>
  );
};

export default SignInBtn;