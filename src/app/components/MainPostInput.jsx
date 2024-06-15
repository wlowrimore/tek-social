'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { HiOutlinePhoto } from "react-icons/hi2";
const MainPostInput = () => {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className='flex border border-gray-200 p-3 space-x-3 w-full'>
      <Image
        src={session.user.image}
        alt={session.user.username}
        width={100}
        height={100}
        className='rounded-full w-11 h-11 cursor-pointer hover:brightness-95 transition-all duration-200'
      />
      <div className='w-full divide-y divide-gray-200'>
        <textarea className='w-full border-none outline-none tracking-wide min-h-[3rem] text-gray-700' rows={2} placeholder={`How can we help, ${session.user.name.split(' ')[0]}?`}></textarea>
        <div className='flex items-center justify-between pt-2.5'>
          <HiOutlinePhoto className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer' />
          <button disabled className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default MainPostInput