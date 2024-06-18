'use client';

import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi';

export default function CommentDetails({ comment, id }) {
  console.log("Comment:", comment)
  const commentDate = new Date(comment?.data().timestamp?.seconds * 1000).toLocaleString()
  const formattedCommentDate = commentDate.split(', ')[0];
  return (
    <div className='flex p-3 border-b border-gray-200 hover:opacity-80 transition duration-200 pl-14'>
      <img src={comment?.data().userImg} alt='profile' className='h-9 w-9 rounded-full mr-4' />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-sm truncate hover:underline cursor-pointer'>{comment?.data().name}</h4>
            <span className='text-xs truncate'>@{comment?.data().username}</span>
          </div>
          <HiDotsHorizontal className='text-gray-500' />
        </div>
        <p className='italic text-xs text-gray-700'>comment posted on {formattedCommentDate}</p>
        <p className='text-gray-800 text-xs my-3'>{comment?.data().comment}</p>
      </div>
    </div>
  )
}
