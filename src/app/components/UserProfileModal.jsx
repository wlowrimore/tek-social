'use client';

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Modal from 'react-modal'
import { HiX } from 'react-icons/hi'

export default function UserProfileModal({ open, setOpen }) {
  const { data: session } = useSession()

  return (
    <div className=''>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className='max-w-2xl w-[80%] max-h-[70%] absolute top-48 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-y-scroll outline-none border-none'
        >
          {session ? (
            <div className=''>
              <HiX onClick={() => setOpen(false)} className='relative left-[95%] top-2 text-2xl text-gray-700 font-bold hover:text-gray-400 transition duration-200 cursor-pointer' />
              <div className='flex items-center space-x-2 p-4'>
                <div>
                  <Image
                    src={session?.user?.image || 'No Image Available'}
                    alt='Profile Picture'
                    width={150}
                    height={150}
                    priority
                    className='py-2 px-3 rounded-2xl hover:bg-gray-100 transition duration-200' />
                </div>
                <div className='flex flex-col'>
                  <p className='text-2xl font-bold tracking-wide'>{session?.user?.name}</p>
                  <p className='text-sm text-gray-600'>{session?.user?.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>No User Logged In</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
