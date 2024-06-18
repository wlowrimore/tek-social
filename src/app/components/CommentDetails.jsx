'use client';

import { useState, useEffect } from 'react'
import { app } from '../../firebase';
import { getFirestore } from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react';
import { doc, setDoc, serverTimestamp, onSnapshot, collection, deleteDoc } from 'firebase/firestore';
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';

export default function CommentDetails({ comment, commentId, originalPostId }) {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const commentDate = new Date(comment?.timestamp?.seconds * 1000).toLocaleString()
  const formattedCommentDate = commentDate.split(', ')[0];

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, 'post', originalPostId, "comments", commentId, "likes", session?.user.uid), {});
      } else {
        await setDoc(doc(db, 'post', originalPostId, "comments", commentId, "likes", session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, 'post', originalPostId, 'comments', commentId, 'likes'), (snapshot) => {
      setLikes(snapshot.docs)
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);

  return (
    <div className='flex p-3 border-b border-gray-200 hover:opacity-80 transition duration-200 pl-14'>
      <img src={comment?.userImg} alt='profile' className='h-9 w-9 rounded-full mr-4' />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-sm truncate hover:underline cursor-pointer'>{comment?.name}</h4>
            <span className='text-xs truncate'>@{comment?.username}</span>
          </div>
          <HiDotsHorizontal className='text-gray-500' />
        </div>
        <p className='italic text-xs text-gray-700'>comment posted on {formattedCommentDate}</p>
        <p className='text-gray-800 text-xs my-3'>{comment?.comment}</p>
        <div className='flex items-center'>
          {isLiked ? (
            <HiHeart
              onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 text-red-600 hover:text-rose-500 hover:bg-red-100' />
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-rose-500 hover:bg-red-100' />
          )}
          {likes.length > 0 && <span className={`text-xs ${isLiked && 'text-red-600'}`}>{likes.length}</span>}
        </div>
      </div>
    </div>
  )
}
