'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { HiHome } from "react-icons/hi";
import SiteLogo from "../../../public/images/site-logo-trans.webp"

const SideBar = () => {
  const { data: session } = useSession();

  return (
    <div className='flex flex-col gap-4 p-3'>
      <Link href='/'>
        <Image src={SiteLogo} alt='Site Logo' width={175} height={175} className='py-2 px-3 rounded-full hover:bg-gray-100 transition duration-200' />
      </Link>
      <Link href='/' className='flex items-center gap-2 py-2 px-3 rounded-full hover:bg-gray-100 transition duration-200'>
        <HiHome className='w-7 h-7 opacity-80' />
        <span className='font-bold hidden xl:inline w-fit'>Home</span>
      </Link>
      {!session ? (
        <button onClick={() => signIn()} className='bg-blue-400 text-white font-semibold rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline'>Sign In</button>
      ) : (
        <button onClick={() => signOut({ callbackUrl: "/", redirect: true })} className='bg-blue-400 text-white font-semibold rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline'>Sign Out</button>
      )}
    </div>
  )
}

export default SideBar