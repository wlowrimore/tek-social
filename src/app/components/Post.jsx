'use client';

import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { posterProfileModalState } from '../../atom/modalAtom'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link';
import { HiDotsHorizontal, HiOutlineEye } from "react-icons/hi";
import Icons from './UI/Icons';
import PosterProfileDetails from './PosterProfileModal';
import PosterProfileModal from './PosterProfileModal';
import ImageModal from './ImageModal';

export default function Post({ post, id }) {
  const [showLink, setShowLink] = useState(false);
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const [open, setOpen] = useRecoilState(posterProfileModalState)
  const [imageClicked, setImageClicked] = useState(false);

  const { data: session } = useSession();

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

  const handleImgClick = () => {
    if (session) {
      setImgModalOpen(true)
      setImageClicked(false);
      console.log("IMAGE CLICKED FROM ID MODAL:");
    } else {
      signIn();
    }
  }

  return (
    <div className='flex p-3 border-b border-gray-200 dark:border-primaryRed hover:opacity-80 transition duration-200'>
      <img src={post?.profileImg} alt='profile' className='h-11 w-11 rounded-full mr-4' />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 onClick={handleModalOpen} className='font-bold text-sm truncate hover:underline cursor-pointer'>{post?.name}</h4>
            <span className='text-xs truncate'>@{post?.username}</span>
          </div>
          <div className='relative w-1/2'>
            {session?.user?.uid !== post?.uid && (
              <div className='flex justify-end'>
                <HiOutlineEye onClick={handleLinkText} className='relative w-8 text-gray-500 dark:text-gray-200 dark:hover:bg-neutral-700 px-1 rounded-full hover:bg-secondaryRed cursor-pointer' />
              </div>
            )}
            {showLink && (
              <div className='absolute w-fit right-0 bg-white rounded shadow'>
                <p onClick={(e) => handleModalOpen(e)} className='w-full text-sm py-1 px-2 cursor-pointer hover:text-primaryRed dark:text-primaryRed dark:hover:bg-opacity-20'>View Profile</p>
              </div>
            )}
          </div>
        </div>
        <PosterProfileModal open={open} setOpen={setOpen} posterId={open?.posterId} />
        <p className='italic text-xs text-gray-700 dark:text-gray-400'>original post on {formattedPostDate}</p>
        <Link href={`/posts/${id}`}>
          <p className='text-gray-800 dark:text-gray-200 text-sm my-3'>{post?.text}</p>
          {imgModalOpen && <ImageModal open={imgModalOpen} setOpen={setImgModalOpen} src={post?.image} handleImgClick={handleImgClick} />}
          {post?.image ? (
            <div className='w-full h-[16rem]'>
              <img src={post?.image} onClick={handleImgClick}
                className='rounded-2xl mr-2 object-cover max-h-[16rem] cursor-pointer' />
            </div>
          ) : null}
        </Link>
        <Icons id={id} uid={post?.uid} />
      </div>
    </div>
  )
}

