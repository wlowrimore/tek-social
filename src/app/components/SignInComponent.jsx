"use client";

import Image from "next/image";
import SiteLogo from '../../../public/images/site-logo-trans.webp'
import GoogleSignInBtn from './UI/GoogleSignInButton'
import CancelBtn from "./UI/CancelButton";
import GitHubSignInBtn from "./UI/GitHubSignInButton";

const SignInComponent = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center p-4 dark:px-0 py-4'>
      <div className='pt-4 pb-8 w-full flex justify-center border-b border-gray-300'>
        <Image
          src={SiteLogo}
          alt='site logo'
          width={1000}
          height={1000}
          className='w-[16rem] h-auto'
        />
      </div>
      <article className='flex flex-col items-center justify-center px-4 py-4 dark:bg-neutral-900'>
        <p className='text-lg tracking-wide'>Welcome to <span className='font-bold'>Tek Social &reg;</span>.  We are a platform created for sharing and discovering real-world experiences and thoughts on technical interviews from a dev&apos;s perspective.  Whether you are a newby, or you&apos;ve been at it for a long time, this is the space where developers can prepare themselves for that next role..</p>
        <br />
        <p className='text-lg tracking-wide'>We&apos;re here to help you navigate the tech interview landscape, and so are our members.  We try to make it as easy as possible to get going.  Just sign in below, and get started building your network!</p>
      </article>
      <div className='w-full flex flex-col items-center justify-around px-4'>
        <div className='flex items-center space-x-4 pt-6'>
          <GoogleSignInBtn />
          <CancelBtn />
          <GitHubSignInBtn />
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;