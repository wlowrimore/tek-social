'use client';

import Link from 'next/link';
import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

export default function Icons() {

  return (
    <div className='flex items-center p-2 gap-5 text-gray-500'>
      <HiOutlineChat className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
      <HiOutlineHeart className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-rose-500 hover:bg-red-100' />
      <HiOutlineTrash className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-purple-500 hover:bg-purple-100' />
    </div>
  )
}