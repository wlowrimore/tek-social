'use client'

import Modal from 'react-modal'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../../atom/modalAtom'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { HiX } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { app } from '../../firebase';
import { getFirestore, doc, setDoc, serverTimestamp, onSnapshot, addDoc, collection } from 'firebase/firestore'

export default function CommentModal() {
  const { data: session } = useSession()
  const router = useRouter()
  const db = getFirestore(app);
  const [open, setOpen] = useRecoilState(modalState)
  const [input, setInput] = useState("");
  const [postId, setPostId] = useRecoilState(postIdState)
  const [post, setPost] = useState();

  useEffect(() => {
    if (postId !== "") {
      const postRef = doc(db, 'posts', postId);
      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          console.log("No such document!");
        }
      })
      return unsubscribe;
    }
  }, [postId])

  const sendComment = async () => {
    addDoc(collection(db, 'posts', postId, 'comments'), {
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      comment: input,
      timestamp: serverTimestamp(),
    }).then(() => {
      setInput("");
      setOpen(false);
      router.push(`/posts/${postId}`);
    }).catch((error) => {
      console.log("Error adding comment:", error);
    })
  };

  const postDate = new Date(post?.timestamp?.seconds * 1000).toLocaleString()
  const formattedPostDate = postDate.split(', ')[0];

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md'
        >
          <div className='p-4'>
            <div className='border-b border-gray-200 py-2 px-1.5'>
              <HiX className='text-2xl trct-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer'
                onClick={() => setOpen(false)}
              />
            </div>
            <div className='p-2 flex items-center space-x-1 relative'>
              <span className='w-0.5 h-full z-[-1] absolute left-8 top-8 bg-gray-300'></span>
              <img src={post?.profileImg} alt="user-img" className='h-11 w-11 rounded-full mr-4' />
              <h4 className='font-bold sm:text-[1rem] text-[0.9rem] hover:underline cursor-pointer truncate'>{post?.name}
              </h4>
              <span className='text-sm sm:text-[0.9rem] truncate'>@{post?.username}</span>
            </div>
            <div className='ml-[3.8rem] mt-[-1.25rem] mb-[0.5rem]'>
              <p className='italic text-xs text-gray-700'>posted {formattedPostDate}</p>
            </div>
            <p className='text-gray-500 sm:text-[1rem] text-[0.9rem] ml-[3.8rem] mb-2'>{post?.text}
            </p>
            <div className='flex p-3 space-x-3'>
              <img src={session?.user.image} alt='user-img' className='h-11 w-11 rounded-full cursor-pointer hover:opacity-90 transition duration-200'
              />
              <div className='w-full divide-y-2 divide-gray-200'>
                <div>
                  <textarea className='w-full border-none outline-none tracking-wide min-h-[3rem] text-gray-700 placeholder:text-gray-500 placeholder:text-sm mt-2'
                    placeholder='Leave a comment...'
                    rows='2'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                <div className='w-full flex items-center justify-end pt-2.5'>
                  <button className='px-4 py-1 text-primaryRed font-bold hover:bg-secondaryRed hover:text-neutral-700 rounded-md transition duration-200 disabled:opacity-50 cursor-pointer'
                    disabled={!input.trim()}
                    onClick={sendComment}
                  >Comment</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )
      }
    </div>
  )
}
