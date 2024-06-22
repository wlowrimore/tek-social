'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function SmallScreenAuthLinks() {
  const { data: session } = useSession();

  return (
    <div className='inline sm:hidden items-center w-full'>
      {!session ? (
        <div className='flex items-center rounded-full hover:text-primaryRed hover:bg-PrimaryRed cursor-pointer transition duration-200'>
          <h3 onClick={() => signIn()} className='w-fit h-auto font-bold'>Sign In</h3>
        </div>
      ) : (
        <div className='flex items-center rounded-full hover:text-primaryRed hover:bg-PrimaryRed cursor-pointer transition duration-200'>
          <h3 onClick={() => signOut({ callbackUrl: "/", redirect: true })} className='w-fit h-auto font-bold'>Sign Out</h3>
        </div>
      )}
    </div>
  )
}
