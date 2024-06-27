"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import GitHubLogo from "../../../../public/images/github-logo.svg";

const GitHubSignInBtn = () => {
  return (
    <div className="flex items-center px-4 py-2.5">
      <Image
        src={GitHubLogo}
        width={76}
        height={76}
        alt="github logo"
        className="absolute py-2.5 pl-3 rounded-full opacity-60"
      />
      <button
        className="relative hover:opacity-40 transition duration-300 left-1.5 font-bold text-gray-700 text-2xl bg-white/20"
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        SignIn
      </button>
    </div>
  );
};

export default GitHubSignInBtn;