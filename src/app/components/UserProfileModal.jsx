'use client';

import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { ProfileDetailsModalState, profileDetailsState } from '../../atom/profileDetailsAtom';
import { userProfileModalState } from '../../atom/modalAtom';
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Modal from 'react-modal'
import { HiX } from 'react-icons/hi'
import ProfileDetailsForm from './forms/ProfileDetailsForm';

export default function UserProfileModal() {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(userProfileModalState)
  const [detailsOpen, setDetailsOpen] = useRecoilState(ProfileDetailsModalState)
  const [detailsComplete, setDetailsComplete] = useRecoilState(profileDetailsState);

  const handleDetailsForm = () => {
    setDetailsOpen(true);
  }

  return (
    <div className=''>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className='max-w-xl w-[50%] max-h-[80%] absolute top-40 left-[50%] translate-x-[-50%] bg-neutral-50 border-2 border-gray-200 rounded-xl shadow-md outline-none overflow-y-scroll'
        >
          {session ? (
            <div className=''>
              <HiX onClick={() => setOpen(false)} className='relative left-[93%] top-2 text-2xl text-gray-700 font-bold hover:text-gray-400 transition duration-200 cursor-pointer' />
              <div className='flex items-center space-x-2 p-4'>
                <div>
                  <Image
                    src={session?.user?.image || 'No Image Available'}
                    alt='Profile Picture'
                    width={150}
                    height={150}
                    priority
                    className='pt-2 pb-5 px-3 rounded-2xl hover:bg-gray-100 transition duration-200' />
                </div>
                <div className='flex flex-col'>
                  <p className='text-2xl font-bold tracking-wide'>{session?.user?.name}</p>
                  <p className='text-sm text-gray-600'>{session?.user?.email}</p>
                  <div className='my-4 hover:text-gray-500 transition duration-200'>
                    <button onClick={handleDetailsForm} className={`hover:underline ${detailsComplete ? 'Update Profile' : 'Complete Your Profile'}`}><span className='text-sm text-gray-600'>(Optional)</span></button>
                  </div>
                </div>
              </div>
              {detailsOpen && (
                <div className=''>
                  <ProfileDetailsForm setOpen={setOpen} setDetailsOpen={setDetailsOpen} setDetailsComplete={setDetailsComplete} />
                </div>
              )}
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
