"use client";

import Image from "next/image";
import SiteLogo from '../../../public/images/site-logo-trans.webp'
import SignInBtn from './UI/SignInButton'
import CancelBtn from "./UI/CancelButton";

const SignInComponent = () => {
  return (
    <div className='mt-24 w-full flex flex-col items-center justify-center p-4'>
      <div className='py-4 w-full flex justify-center border-b border-gray-300'>
        <Image
          src={SiteLogo}
          alt='site logo'
          width={100}
          height={100}
          className='w-[16rem] h-auto'
        />
      </div>
      <article className='flex flex-col items-center justify-center px-4 py-8'>
        <p>Welcome to Tek Social &reg;.  We are a platform created for sharing and discovering real-world experiences and thoughts on technical interviews from a dev&apos;s perspective.  Whether you are a newby, or you&apos;ve been at it for a long time, this is the space where developers can prepare themselves for that next role..</p>
        <br />
        <p>We&apos;re here to help you navigate the tech interview landscape, and so are our members.  We try to make it as easy as possible to get going.  Just sign in below, and get started building your network!</p>
      </article>
      <div className='w-full flex items-center justify-around px-4'>
        <SignInBtn />
        <CancelBtn />
      </div>
    </div>
  );
};

export default SignInComponent;