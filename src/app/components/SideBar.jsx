'use client';

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { HiHome, HiDotsHorizontal, HiUserAdd, HiUserRemove } from "react-icons/hi";
import SiteLogo from "../../../public/images/site-logo-trans.webp"
import UserProfileModal from "../components/UserProfileModal"
import { useRecoilState } from 'recoil'
import { userProfileModalState } from '../../atom/modalAtom';

const SideBar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(userProfileModalState);

  const handleModalOpen = () => {
    setOpen(true);
    console.log("OPEN", open)
  }

  return (
    <div className='flex flex-col p-3 justify-between min-h-screen'>
      <div className='flex flex-col gap-4'>
        <Link href='/'>
          <Image src={SiteLogo} alt='Site Logo' width={200} height={200} priority className='py-2 px-3 rounded-full hover:bg-gray-100 transition duration-200' />
        </Link>
        <Link href='/' className='flex items-center gap-2 py-2 px-3 rounded-full hover:text-primaryRed hover:bg-gray-100 transition duration-200'>
          <HiHome className='w-7 h-7' />
          <span className='font-bold hidden lg:inline w-fit'>Home</span>
        </Link>
        {!session ? (
          <div onClick={() => signIn()} className='flex items-center gap-2 cursor-pointer py-2 px-3 rounded-full hover:text-primaryRed hover:bg-gray-100 transition duration-200'>
            <HiUserAdd className='w-8 h-8' />
            <span className='font-bold hidden lg:inline w-fit'>Sign In</span>
          </div>
        ) : (
          <div onClick={() => signOut({ callbackUrl: "/", redirect: true })} className='flex items-center gap-2 cursor-pointer py-2 px-3 rounded-full hover:text-primaryRed hover:bg-gray-100 transition duration-200'>
            <HiUserRemove className='w-8 h-8' />
            <span className='font-bold hidden lg:inline w-fit'>Sign Out</span>
          </div>
        )}
      </div>
      {session && (
        <div onClick={handleModalOpen} className='text-sm text-gray-700 flex items-center p-3 hover:bg-gray-100 transition-all duration-200 cursor-pointer rounded-full'>
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
      <UserProfileModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default SideBar