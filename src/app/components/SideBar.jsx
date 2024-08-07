'use client';

import { useRecoilValue } from 'recoil'
import { useRecoilState } from 'recoil'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { HiHome, HiDotsHorizontal, HiUserAdd, HiUserRemove } from "react-icons/hi";
import SiteLogo from "../../../public/images/site-logo-trans.webp"
import SiteLogoDark from "../../../public/images/site-logo-dark-trans.webp"
import UserProfileModal from "../components/UserProfileModal"
import { userProfileModalState, } from '../../atom/modalAtom';
import { profileDetailsState, profileDetailsDataState } from "../../atom/profileDetailsAtom";
import { profileSuccessMsgContentState, profileUpdateSuccessMsgContentState } from "../../atom/statusMessagesAtom";
import { ThemeSwitcher } from './UI/ThemeSwitcher';

const SideBar = () => {
  const { data: session } = useSession();

  const [open, setOpen] = useRecoilState(userProfileModalState);
  const [profileDetails] = useRecoilState(profileDetailsDataState);
  const successMsgContent = useRecoilValue(profileSuccessMsgContentState)
  const updateSuccessMsgContent = useRecoilValue(profileUpdateSuccessMsgContentState)
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (successMsgContent) {
      setIsVisible(true);
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [successMsgContent])

  useEffect(() => {
    if (updateSuccessMsgContent) {
      setIsVisible(true);
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [updateSuccessMsgContent])

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

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setTheme(theme === 'light' ? 'dark' : 'light');
    }, 200);
  }

  return (
    <div className='flex flex-col py-14 px-8 min-w-[20rem] min-h-screen'>
      <div className='flex flex-col gap-4'>
        {theme === 'dark' ? (
          <Link href='/'>
            <Image src={SiteLogoDark} alt='Site Logo' width={1000} height={1000} priority className='w-full rounded hover:bg-neutral-800 transition duration-200' />
          </Link>
        ) : (
          <Link href='/'>
            <Image src={SiteLogo} alt='Site Logo' width={1000} height={1000} priority className='w-full rounded hover:bg-gray-100 dark:bg-neutral-400 transition duration-200' />
          </Link>
        )}
        <Link href='/' className='flex items-center gap-3 py-2 px-3 rounded hover:text-primaryRed hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-neutral-800 transition duration-200'>
          <HiHome className='w-7 h-7' />
          <span className='font-bold hidden lg:inline w-fit'>Home</span>
        </Link>
        {!session ? (
          <div onClick={() => signIn()} className='flex items-center gap-2 cursor-pointer py-2 px-3 rounded hover:text-primaryRed hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-neutral-800 transition duration-200'>
            <HiUserAdd className='w-8 h-8' />
            <span className='font-bold hidden lg:inline w-fit'>Sign In</span>
          </div>
        ) : (
          <div onClick={() => signOut({ callbackUrl: "/", redirect: true })} className='flex items-center gap-2 cursor-pointer py-2 px-3 rounded hover:text-primaryRed hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-neutral-800 transition duration-200'>
            <HiUserRemove className='w-8 h-8' />
            <span className='font-bold hidden lg:inline w-fit'>Sign Out</span>
          </div>
        )}
      </div>
      <div onClick={toggleTheme} className={`mt-4 cursor-pointer theme-icon flex items-center p-3 rounded hover:text-primaryRed hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-neutral-800 transition duration-200 ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <ThemeSwitcher toggleTheme={toggleTheme} isAnimating={isAnimating} theme={theme} className='bg-white text-gray-800 dark:bg-transparent dark:text-white dark:hover:text-gray-200' />
        <span className={`font-bold hidden lg:inline w-fit cursor-pointer dark:hover:text-gray-200 dark:hover:bg-neutral-800 ${isAnimating ? 'opacity-0' : (theme === 'light' || theme === 'dark' ? 'opacity-100' : 'opacity-0')}`}>Switch Theme</span>
      </div>
      <div className={`mt-6 ${isVisible ? 'block opacity-100' : 'block opacity-0'} transition-opacity duration-500`}>
        {successMsgContent && <p className='w-full bg-green-100 text-gray-800 font-bold rounded-lg p-2'>{successMsgContent}</p>}
      </div>
      <div className={`mt-6 ${isVisible ? 'block opacity-100' : 'block opacity-0'} transition-opacity duration-500`}>
        {updateSuccessMsgContent && <p className='w-full bg-blue-100 text-gray-800 font-bold rounded-lg p-2'>{updateSuccessMsgContent}</p>}
      </div>

      {session && (
        <div onClick={handleModalOpen} className='text-sm text-gray-700 flex items-center p-3 hover:bg-gray-100 dark:hover:bg-neutral-700/70 transition-all duration-200 cursor-pointer rounded-full mt-auto'>
          <Image
            src={session.user.image}
            alt={session.user.username}
            width={100}
            height={100}
            className='rounded-full w-10 h-10 xl:mr-2'
          />
          <div className='hidden xl:inline'>
            <h4 className='text-sm text-gray-800 dark:text-gray-200 font-bold'>{session.user.name}</h4>
            <p className='text-xs text-gray-500 dark:text-gray-400'>@{session.user.username}</p>
          </div>
          <HiDotsHorizontal className='h-5 xl:ml-8 hidden xl:inline dark:text-gray-200' />
        </div>
      )}
      <UserProfileModal open={open} setOpen={setOpen} profileDetailsInModal={profileDetailsInModal} />
    </div>
  )
}

export default SideBar