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
import { PiGithubLogoBold, PiLinkedinLogo, PiLetterCirclePBold } from "react-icons/pi";
import { HiPencil } from 'react-icons/hi';
export default function UserProfileModal() {
  const { data: session } = useSession();
  const uid = session?.user?.uid
  console.log("USER ID", uid)
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
      data.push({ id: doc.uid, profileId: doc.id, ...doc.data() });
    })

    return data
  }

  useEffect(() => {
    async function fetchProfile(profileId) {
      if (uid === profileId) {
        const profile = await fetchProfileFromDB();
        setProfile(profile[0]);
      } else {
        console.log("Not logged in")
      }
    }

    fetchProfile();
  }, [])
  console.log("Session Email:", session?.user?.email)

  const topFiveSkills = profile?.skills?.slice(0, 5)

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
                    {topFiveSkills ? (
                      <>
                        <p className='text-lg font-bold '>Top 5 Skills</p>
                        {topFiveSkills?.map((skill) => (
                          <p key={skill} className='text-sm tracking-wider text-gray-800'>{skill}</p>
                        ))}
                      </>
                    ) : null}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='mb-4'>
                    <p className='text-2xl font-bold tracking-wide'>{session?.user?.name}</p>
                    <p className='text-sm text-gray-600'>{session?.user?.email}</p>
                  </div>
                  {profile.location ? (
                    <div className='mb-4'>
                      <h3 className='text-lg font-bold'>Location</h3>
                      <p className='text-gray-600'>{profile.location}</p>
                    </div>
                  ) : null}
                  {profile?.bio ? (
                    <div className='leading-5 mb-4'>
                      <h3 className='text-lg font-bold'>About me</h3>
                      <p className=' text-gray-800 tracking-wide'>{profile.bio}</p>
                    </div>
                  ) : (
                    null
                  )}
                  {profile?.gitHubUrl || profile?.linkedInUrl || profile?.portfolioUrl ? (
                    <div className=''>
                      <h3 className='text-lg font-bold'>Links</h3>
                    </div>
                  ) : null}
                  {profile?.gitHubUrl ? (
                    <div className='flex items-center space-x-2'>
                      <h3 className=''><PiGithubLogoBold /></h3>
                      <p className='text-sm text-gray-600'>{profile.gitHubUrl}</p>
                    </div>
                  ) : null}
                  {profile?.linkedInUrl ? (
                    <div className='flex items-center space-x-2'>
                      <h3 className=''><PiLinkedinLogo /></h3>
                      <p className='text-sm text-gray-600'>{profile.linkedInUrl}</p>
                    </div>
                  ) : null}
                  {profile?.portfolioUrl ? (
                    <div className='flex items-center space-x-2'>
                      <h3 className=''><PiLetterCirclePBold /></h3>
                      <p className='text-sm text-gray-600'>{profile.portfolioUrl}</p>
                    </div>
                  ) : null}
                  <div className='m-4 hover:text-gray-500 transition duration-200 py-1 pr-1'>
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
