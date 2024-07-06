'use client';

import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { posterProfileModalState } from '../../atom/modalAtom'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { HiDotsHorizontal } from "react-icons/hi";
import Icons from './UI/Icons';
import PosterProfileDetails from './PosterProfileModal';
import PosterProfileModal from './PosterProfileModal';

export default function Post({ post, id }) {
  const [showLink, setShowLink] = useState(false);
  const [open, setOpen] = useRecoilState(posterProfileModalState)

  const { data: session } = useSession();
  console.log("SESSION DATA:", session)

  const postDate = new Date(post?.timestamp?.seconds * 1000).toLocaleString()
  const formattedPostDate = postDate.split(', ')[0];

  const handleLinkText = (e) => {
    setShowLink(!showLink);
  }

  const handleModalOpen = (e) => {
    e.stopPropagation();
    const posterId = post?.uid
    if (posterId !== session?.user?.uid) {
      setOpen({
        true: true,
        posterId: posterId
      })
      setShowLink(false)
      console.log("POSTER ID AFTER 'IF' CONDITION:", posterId)
    } else {
      console.log("Profile ID is same as session user ID")
    }
  }

  return (
    <div className='flex p-3 border-b border-gray-200 hover:opacity-80 transition duration-200'>
      <img src={post?.profileImg} alt='profile' className='h-11 w-11 rounded-full mr-4' />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-sm truncate hover:underline cursor-pointer'>{post?.name}</h4>
            <span className='text-xs truncate'>@{post?.username}</span>
          </div>

          <HiDotsHorizontal onClick={handleLinkText} className='relative w-8 text-gray-500 px-1 rounded-full hover:bg-secondaryRed cursor-pointer' />
        </div>
        {showLink && (
          <div className='absolute left-[54%] w-fit h-fit bg-white rounded shadow'>
            <p onClick={(e) => handleModalOpen(e)} className='text-sm py-1 px-2 cursor-pointer hover:text-primaryRed'>View Profile</p>
          </div>
        )}
        <PosterProfileModal open={open} setOpen={setOpen} posterId={open?.posterId} />
        <p className='italic text-xs text-gray-700'>original post on {formattedPostDate}</p>
        <Link href={`/posts/${id}`}>
          <p className='text-gray-800 text-sm my-3'>{post?.text}</p>
        </Link>
        <Link href={`/posts/${id}`} className='w-full h-[16rem]'>
          <img src={post?.image}
            className='rounded-2xl mr-2 object-cover max-h-[20rem]' />
        </Link>
        <Icons id={id} uid={post?.uid} />
      </div>
    </div>
  )
}

