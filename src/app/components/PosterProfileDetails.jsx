'use client';

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getFirestore, query, where } from 'firebase/firestore';
import { getDocs, collection } from 'firebase/firestore';
import { app } from '../../firebase'
import { useRecoilState } from 'recoil';
import { posterProfileModalState } from '@/atom/modalAtom';

import Image from 'next/image'
import Link from 'next/link';

import { HiX } from 'react-icons/hi'
import { PiGithubLogoBold, PiLinkedinLogo, PiLetterCirclePBold } from "react-icons/pi";

export default function PosterProfileDetails({ posterId }) {
  console.log("POSTER ID:", posterId)
  const { data: session } = useSession();
  const db = getFirestore(app);

  const [open, setOpen] = useRecoilState(posterProfileModalState)

  const [creatorProfile, setCreatorProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  async function fetchCreatorProfileFromDB() {
    const q = query(collection(db, 'profile'), where('profileId', '==', posterId ?? ''))
    console.log("Q in fetchCreatorProfileFromDB:", q)
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Data in fetchCreatorProfileFromDB:", data)
    return data[0]
  }

  const fetchAndSetCreatorProfileData = async () => {
    const postCreatorProfile = await fetchCreatorProfileFromDB();
    console.log("POST CREATOR PROFILE:", postCreatorProfile)
    if (postCreatorProfile && postCreatorProfile?.profileId !== session?.user?.uid) {
      setCreatorProfile({ profileDetails: postCreatorProfile })
    } else if (postCreatorProfile && postCreatorProfile?.profileId === session?.user?.uid) {
      setCreatorProfile({})
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAndSetCreatorProfileData();
    setIsLoading(false);
  }, [posterId])

  const topFiveSkills = creatorProfile?.profileDetails?.skills?.slice(0, 5)

  return (
    <>
      {isLoading ? <div>Loading...</div> :
        <div>
          {creatorProfile.profileDetails ? (
            <div className='bg-zinc-100'>
              <HiX onClick={() => setOpen(false)} className='relative left-[93%] top-2 text-2xl text-gray-700 font-bold hover:text-gray-400 transition duration-200 cursor-pointer' />
              <div className='flex items-start space-x-6 p-4'>
                <div className='flex flex-col'>
                  <Image
                    src={creatorProfile?.profileDetails?.image}
                    alt='Profile Picture'
                    width={175}
                    height={175}
                    priority
                    className='pt-2 pb-2 px-3 rounded-2xl hover:bg-gray-100 transition duration-200' />
                  <div className='flex flex-col px-3'>
                    {topFiveSkills ? (
                      <>
                        <p className='text-lg font-bold '>Top 5 Skills</p>
                        {topFiveSkills?.map((skill) => (
                          <p key={skill} className='text-sm tracking-wider text-gray-800 font-semibold'>{skill}</p>
                        ))}
                      </>
                    ) : null}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='mb-4'>
                    <p className='text-2xl font-bold tracking-wide'>{creatorProfile?.profileDetails?.name}</p>
                    <p className='text-sm text-gray-600'>{creatorProfile?.profileDetails?.email}</p>
                  </div>
                  <>
                    {creatorProfile?.profileDetails?.location ? (
                      <div className='mb-4'>
                        <h3 className='text-lg font-bold'>Location</h3>
                        <p className='text-gray-600'>{creatorProfile.profileDetails?.location}</p>
                      </div>
                    ) : null}
                    {creatorProfile?.profileDetails?.bio ? (
                      <div className='leading-5 mb-4'>
                        <h3 className='text-lg font-bold'>About me</h3>
                        <p className=' text-gray-800 tracking-wide'>{creatorProfile?.profileDetails?.bio}</p>
                      </div>
                    ) : (
                      null
                    )}
                    {creatorProfile?.profileDetails.gitHubUrl || creatorProfile?.profileDetails?.linkedInUrl || creatorProfile?.profileDetails?.portfolioUrl ? (
                      <div className=''>
                        <h3 className='text-lg font-bold'>Links</h3>
                      </div>
                    ) : null}
                    {creatorProfile?.profileDetails?.gitHubUrl ? (
                      <Link href={creatorProfile?.profileDetails?.gitHubUrl} target='_blank' rel='noopener noreferrer' className='flex items-center space-x-2 py-2 px-2 hover:bg-zinc-200 rounded-lg transition duration-300 ml-[-0.6rem]'>
                        <h3 className=''><PiGithubLogoBold /></h3>
                        <p className='text-sm text-gray-600 hover:text-primaryRed'>{creatorProfile?.profileDetails?.gitHubUrl}</p>
                      </Link>
                    ) : null}
                    {creatorProfile?.profileDetails?.linkedInUrl ? (
                      <Link href={creatorProfile?.profileDetails?.linkedInUrl} target='_blank' rel='noopener noreferrer' className='flex items-center space-x-2 py-2 px-2 hover:bg-zinc-200 rounded-lg transition duration-300 ml-[-0.6rem]'>
                        <h3 className=''><PiLinkedinLogo /></h3>
                        <p className='text-sm text-gray-600 hover:text-primaryRed'>{creatorProfile?.profileDetails?.linkedInUrl}</p>
                      </Link>
                    ) : null}
                    {creatorProfile?.profileDetails?.portfolioUrl ? (
                      <Link href={creatorProfile?.profileDetails?.portfolioUrl} target='_blank' rel='noopener noreferrer' className='flex items-center space-x-2 py-2 px-2 hover:bg-zinc-200 rounded-lg transition duration-300 ml-[-0.6rem]'>
                        <h3 className=''><PiLetterCirclePBold /></h3>
                        <p className='text-sm text-gray-600 hover:text-primaryRed'>{creatorProfile?.profileDetails?.portfolioUrl}</p>
                      </Link>
                    ) : null}
                  </>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>No User Logged In</p>
            </div>
          )}
        </div>
      }
    </>
  )
}