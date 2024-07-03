'use client';

import { useRecoilValue } from 'recoil'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { HiHome, HiDotsHorizontal, HiUserAdd, HiUserRemove } from "react-icons/hi";
import SiteLogo from "../../../public/images/site-logo-trans.webp"
import UserProfileModal from "../components/UserProfileModal"
import { useRecoilState } from 'recoil'
import { userProfileModalState, } from '../../atom/modalAtom';
import { profileDetailsState, profileDetailsDataState } from "../../atom/profileDetailsAtom";
import { profileSuccessMsgContentState } from "../../atom/statusMessagesAtom";

const SideBar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(userProfileModalState);
  const [profileDetails] = useRecoilState(profileDetailsDataState);
  const successMsgContent = useRecoilValue(profileSuccessMsgContentState)



  const [profileDetailsInModal, setProfileDetailsInModal] = useState({
    name: '',
    bio: '',
    location: '',
    skills: [],
    linkedInUrl: '',
    gitHubUrl: '',
    portfolioUrl: '',
    detailsComplete: false,
    image: '',
    timestamp: '',
    uid: '',
    profileId: '',
    email: '',
    id: ''
  });

  useEffect(() => {
    setProfileDetailsInModal({
      name: profileDetails?.name,
      bio: profileDetails?.bio,
      location: profileDetails?.location,
      skills: profileDetails?.skills,
      linkedInUrl: profileDetails?.linkedInUrl,
      gitHubUrl: profileDetails?.gitHubUrl,
      portfolioUrl: profileDetails?.portfolioUrl,
      detailsComplete: profileDetails?.detailsComplete,
      image: profileDetails?.image,
      timestamp: profileDetails?.timestamp,
      uid: profileDetails?.uid,
      profileId: profileDetails?.profileId,
      email: profileDetails?.email,
      id: profileDetails?.id
    })
  }, [profileDetails])


  const handleModalOpen = () => {
    if (profileDetails) {
      setOpen(true);
      console.log("Profile Details In Modal:", profileDetails)
      setProfileDetailsInModal({
        name: profileDetails?.name || '',
        bio: profileDetails?.bio || '',
        location: profileDetails?.location || '',
        skills: profileDetails?.skills || [],
        linkedInUrl: profileDetails?.linkedInUrl || '',
        gitHubUrl: profileDetails?.gitHubUrl || '',
        portfolioUrl: profileDetails?.portfolioUrl || '',
        detailsComplete: profileDetails?.detailsComplete || false,
        image: profileDetails?.image || '',
        timestamp: profileDetails?.timestamp || '',
        uid: profileDetails?.uid || '',
        profileId: profileDetails?.profileId || '',
        email: profileDetails?.email || '',
        id: profileDetails?.id || ''
      })
    } else {
      console.log("No profile details found")
    }
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
      <div className='mt-6'>
        {successMsgContent && <p className='w-full bg-green-100 text-gray-800 font-bold rounded-lg p-2'>{successMsgContent}</p>}
      </div>
      {session && (
        <div onClick={handleModalOpen} className='text-sm text-gray-700 flex items-center p-3 hover:bg-gray-100 transition-all duration-200 cursor-pointer rounded-full mt-auto'>
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
      <UserProfileModal open={open} setOpen={setOpen} profileDetailsInModal={profileDetailsInModal} />
    </div>
  )
}

export default SideBar