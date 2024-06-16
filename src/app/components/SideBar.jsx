'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { HiHome, HiDotsHorizontal } from "react-icons/hi";
import SiteLogo from "../../../public/images/site-logo-trans.webp"

const SideBar = () => {
  const { data: session } = useSession();

  return (
    <div className='flex flex-col p-3 justify-between min-h-screen'>
      <div className='flex flex-col gap-4'>
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
      {session && (
        <div className='text-sm text-gray-700 flex items-center p-3 hover:bg-gray-100 transition-all duration-200 cursor-pointer rounded-full'>
          <Image
            src={session.user.image}
            alt={session.user.username}
            width={100}
            height={100}
            className='rounded-full w-10 h-10 xl:mr-2'
          />
          <div className='hidden xl:inline'>
            <h4 className='text-sm font-bold'>{session.user.name}</h4>
            <p className='text-xs text-gray-500'>@{session.user.username}</p>
          </div>
          <HiDotsHorizontal className='h-5 xl:ml-8 hidden xl:inline' />
        </div>
      )}
    </div>
  )
}

export default SideBar