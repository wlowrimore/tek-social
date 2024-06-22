"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import LinkedInLogo from "../../../../public/images/linkedin-logo.svg";
const LinkedInSignInBtn = () => {

  const signInWithLinkedIn = async () => {
    await signIn("linkedin")
  }
  return (
    <div className="flex items-center px-4 py-2.5">
      <Image
        src={LinkedInLogo}
        width={70}
        height={70}
        alt="google logo"
        className="relative right-1 py-2.5 pl-3 rounded-full opacity-60"
      />
      <button
        className="absolute font-bold text-gray-700 bg-white/20 text-2xl hover:opacity-40 transition duration-300"
        onClick={signInWithLinkedIn}
      >
        SignIn
      </button>
    </div>
  );
};

export default LinkedInSignInBtn;