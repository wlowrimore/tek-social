'use client';

import { useState, useEffect } from 'react';
import { app } from '../../../firebase';
import { doc, setDoc, getFirestore, serverTimestamp, onSnapshot, collection, deleteDoc } from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react';
import { HiOutlineChat, HiOutlineHeart, HiHeart, HiOutlineTrash } from "react-icons/hi";
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../../atom/modalAtom';

export default function Icons({ id, uid }) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [open, setOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState);
  const db = getFirestore(app)

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, 'posts', id, "likes", session?.user.uid), {});
      } else {
        await setDoc(doc(db, 'posts', id, "likes", session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs)
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);

  const toggleModal = (e) => {
    e.preventDefault();
    if (!session) {
      signIn();
    } else {
      setOpen(!open);
      setPostId(id);
    }
  }

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      if (session?.user?.id === uid) {
        deleteDoc(doc(db, 'posts', id)).then(() => {
          console.log("Post deleted successfully");
          window.location.reload();
        }).catch((error) => {
          console.error("Error deleting post:", error);
        })
      } else {
        alert("You are not authorized to delete this post");
      }
    }
  }

  return (
    <div className='flex items-center p-2 gap-5 text-gray-500'>
      <HiOutlineChat
        className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100'
        onClick={toggleModal}
      />
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

      {session?.user?.uid === uid && (
        <HiOutlineTrash onClick={deletePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-purple-500 hover:bg-purple-100' />
      )}
    </div>
  )
}