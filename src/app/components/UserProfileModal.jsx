'use client';

import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ProfileDetailsModalState, profileDetailsState } from '../../atom/profileDetailsAtom';
import { userProfileModalState } from '../../atom/modalAtom';
import { useSession } from 'next-auth/react'
import { app } from '../../firebase'
import Image from 'next/image'
import Modal from 'react-modal'
import { HiX } from 'react-icons/hi'
import ProfileDetailsForm from './forms/ProfileDetailsForm';
import { getFirestore } from 'firebase/firestore';
import { getDocs, collection } from 'firebase/firestore';
import Link from 'next/link';
import { HiPencil } from 'react-icons/hi';
export default function UserProfileModal() {
  const { data: session } = useSession()
  const db = getFirestore(app)
  const [open, setOpen] = useRecoilState(userProfileModalState)
  const [detailsOpen, setDetailsOpen] = useRecoilState(ProfileDetailsModalState)
  const [detailsComplete, setDetailsComplete] = useRecoilState(profileDetailsState);
  const [profile, setProfile] = useState([]);

  const handleDetailsForm = () => {
    setDetailsOpen(!detailsOpen);
    setDetailsComplete(true);
  }

  async function fetchProfileFromDB() {
    const querySnapshot = await getDocs(collection(db, 'profile'));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.uid, ...doc.data() });
    })

    return data
  }

  useEffect(() => {
    async function fetchProfile() {
      const data = await fetchProfileFromDB();
      setProfile(data);
    }

    fetchProfile();
  }, [])

  console.log("PROFILE", profile)
  return (
    <div className=''>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className='max-w-2xl w-[50%] max-h-[80%] absolute top-40 left-[50%] translate-x-[-50%] bg-neutral-50 border-2 border-gray-200 rounded-xl shadow-md outline-none overflow-y-scroll'
        >
          {session ? (
            <div className=''>
              <HiX onClick={() => setOpen(false)} className='relative left-[93%] top-2 text-2xl text-gray-700 font-bold hover:text-gray-400 transition duration-200 cursor-pointer' />
              <div className='flex items-start space-x-8 p-4'>
                <div classname='flex flex-col'>
                  <Image
                    src={session?.user?.image || 'No Image Available'}
                    alt='Profile Picture'
                    width={150}
                    height={150}
                    priority
                    className='pt-2 pb-2 px-3 rounded-2xl hover:bg-gray-100 transition duration-200' />
                  <div className='flex flex-col px-3'>
                    <p className='text-lg font-bold '>My Top 5 Skills</p>
                    {profile[0].skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className=''>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p className='text-2xl font-bold tracking-wide'>{session?.user?.name}</p>
                  <p className='text-sm text-gray-600'>{session?.user?.email}</p>

                  {profile && profile.map((attr) => (
                    <div key={profile.id} className='flex flex-col mt-[1.4rem] '>
                      <h3 className='text-lg font-bold'>About Me</h3>
                      <p className='font-semibold tracking-wider text-gray-700'>{attr.bio}</p>

                      <div className='my-4 text-sm text-gray-800'>
                        <p className='text-lg font-bold'>Links</p>
                        <div className='ml-[-0.5rem]'>
                          <Link href={attr.linkedInUrl} target="_blank" rel="noopener ">
                            <p className='py-1 px-2 hover:bg-gray-200 hover:text-primaryRed rounded-xl transition duration-200'>{attr.linkedInUrl}</p>
                          </Link>
                          <Link href={attr.gitHubUrl} target="_blank" rel="noopener ">
                            <p className='py-1 px-2 hover:bg-gray-200 hover:text-primaryRed rounded-xl transition duration-200'>{attr.gitHubUrl}</p>
                          </Link>
                          <Link href={attr.portfolioUrl} target="_blank" rel="noopener ">
                            <p className='py-1 px-2 hover:bg-gray-200 hover:text-primaryRed rounded-xl transition duration-200'>{attr.portfolioUrl}</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className='text-sm text-gray-600'>{profile.bio}</p>
                  <div className='mb-4 hover:text-gray-500 transition duration-200 py-1 pr-1'>
                    <button onClick={handleDetailsForm} className='flex items-center space-x-2'><p className='text-gray-700 font-semibold hover:text-primaryRed hover:underline transition-all duration-200'>{`${detailsComplete ? 'Edit Profile Details' : 'Add Profile Details'}`}</p><HiPencil /></button>
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
