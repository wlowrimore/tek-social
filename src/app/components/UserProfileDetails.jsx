'use client';

import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ProfileDetailsModalState, profileDetailsState } from '../../atom/profileDetailsAtom';
import { userProfileModalState } from '../../atom/modalAtom';
import { useSession } from 'next-auth/react'
import { getFirestore, query, where } from 'firebase/firestore';
import { getDocs, collection } from 'firebase/firestore';
import { app } from '../../firebase'

import ProfileDetailsForm from './forms/ProfileDetailsForm';
import Image from 'next/image'
import Link from 'next/link';

import { HiX } from 'react-icons/hi'
import { PiGithubLogoBold, PiLinkedinLogo, PiLetterCirclePBold } from "react-icons/pi";
import { HiPencil } from 'react-icons/hi';

export default function UserProfileDetails() {
  const { data: session } = useSession();
  const uid = session?.user?.uid
  const db = getFirestore(app)

  const [open, setOpen] = useRecoilState(userProfileModalState)
  const [detailsOpen, setDetailsOpen] = useRecoilState(ProfileDetailsModalState)
  const [detailsComplete, setDetailsComplete] = useRecoilState(profileDetailsState);
  const [profile, setProfile] = useState({ profileDetails: {} });

  async function fetchProfileFromDB() {
    const q = query(collection(db, 'profile'), where('profileId', '==', uid ?? ''))
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Data in fetchProfileFromDB:", data)
    return data[0]
  }

  const fetchAndSetProfileData = async () => {
    const userProfile = await fetchProfileFromDB();

    if (userProfile) {
      setProfile({ profileDetails: userProfile })
    } else {
      console.log("No profile found")
    }
  }

  useEffect(() => {
    fetchAndSetProfileData();
  }, [uid])

  const handleDetailsForm = async () => {
    await fetchAndSetProfileData();
    setDetailsOpen(!detailsOpen);
    setDetailsComplete(true);
  }

  const topFiveSkills = profile?.profileDetails?.skills?.slice(0, 5)

  return (
    <div>
      {session ? (
        <div className='bg-zinc-100'>
          <HiX onClick={() => setOpen(false)} className='relative left-[93%] top-2 text-2xl text-gray-700 font-bold hover:text-gray-400 transition duration-200 cursor-pointer' />
          <div className='flex items-start space-x-6 p-4'>
            <div className='flex flex-col'>
              <Image
                src={session?.user?.image || 'No Image Available'}
                alt='Profile Picture'
                width={175}
                height={175}
                priority
                className='pt-2 pb-2 px-3 rounded-2xl hover:bg-gray-100 transition duration-200' />
              <div className='flex flex-col px-3'>
                {topFiveSkills ? (
                  <>
                    <p className='text-lg dark:text-neutral-800 font-bold '>Top 5 Skills</p>
                    {topFiveSkills?.map((skill) => (
                      <p key={skill} className='text-sm tracking-wider text-gray-800 font-semibold'>{skill}</p>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='mb-4'>
                <p className='text-2xl dark:text-neutral-800 font-bold tracking-wide'>{session?.user?.name}</p>
                <p className='text-sm text-gray-600'>{session?.user?.email}</p>
              </div>
              {profile?.profileDetails && (
                <>
                  {profile.profileDetails.location ? (
                    <div className='mb-4'>
                      <h3 className='text-lg dark:text-neutral-800 font-bold'>Location</h3>
                      <p className='text-gray-600'>{profile.profileDetails.location}</p>
                    </div>
                  ) : <p className='text-neutral-500 italic text-sm mb-3'>location unavailable</p>}
                  {profile?.profileDetails.bio ? (
                    <div className='leading-5 mb-4'>
                      <h3 className='text-lg font-bold dark:text-neutral-800'>Get to know me</h3>
                      <p className=' text-gray-800 tracking-wide'>{profile.profileDetails.bio}</p>
                    </div>
                  ) : (
                    null
                  )}
                  {profile?.profileDetails?.gitHubUrl || profile?.profileDetails?.linkedInUrl || profile?.profileDetails?.portfolioUrl ? (
                    <div className=''>
                      <h3 className='text-lg dark:text-neutral-800 font-bold'>Links</h3>
                    </div>
                  ) : null}
                  {profile?.profileDetails?.gitHubUrl ? (
                    <Link href={profile?.profileDetails.gitHubUrl} target='_blank' rel='noopener noreferrer' className='flex items-center space-x-2 py-2 px-2 hover:bg-zinc-200 rounded-lg transition duration-300 ml-[-0.6rem]'>
                      <h3 className='dark:text-neutral-800'><PiGithubLogoBold /></h3>
                      <p className='text-sm text-gray-600 hover:text-primaryRed'>{profile?.profileDetails?.gitHubUrl}</p>
                    </Link>
                  ) : null}
                  {profile?.profileDetails?.linkedInUrl ? (
                    <Link href={profile?.profileDetails?.linkedInUrl} target='_blank' rel='noopener noreferrer' className='flex items-center space-x-2 py-2 px-2 hover:bg-zinc-200 rounded-lg transition duration-300 ml-[-0.6rem]'>
                      <h3 className='dark:text-neutral-800'><PiLinkedinLogo /></h3>
                      <p className='text-sm text-gray-600 hover:text-primaryRed'>{profile?.profileDetails?.linkedInUrl}</p>
                    </Link>
                  ) : null}
                  {profile?.profileDetails?.portfolioUrl ? (
                    <Link href={profile?.profileDetails?.portfolioUrl} target='_blank' rel='noopener noreferrer' className='flex items-center space-x-2 py-2 px-2 hover:bg-zinc-200 rounded-lg transition duration-300 ml-[-0.6rem]'>
                      <h3 className='dark:text-neutral-800'><PiLetterCirclePBold /></h3>
                      <p className='text-sm text-gray-600 hover:text-primaryRed'>{profile?.profileDetails?.portfolioUrl}</p>
                    </Link>
                  ) : null}
                </>
              )}
              <div className='m-4 hover:text-gray-500 transition duration-200 py-1 pr-1 ml-0'>
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
    </div>
  )
}