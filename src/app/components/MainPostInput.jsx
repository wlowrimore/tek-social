'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { app } from '../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'

import Image from 'next/image'

import { HiUserAdd, HiUserRemove } from 'react-icons/hi'
import { HiOutlinePhoto, HiOutlineLink } from "react-icons/hi2";
const MainPostInput = () => {
  const { data: session } = useSession()
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [postText, setPostText] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const imagePickRef = useRef(null)
  const db = getFirestore(app);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  }

  const handleSubmitPost = async () => {
    setPostLoading(true);
    const docRef = await addDoc(collection(db, 'posts'), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      text: postText,
      profileImg: session.user.image,
      image: imageFileUrl,
      timestamp: serverTimestamp(),
    })
    setPostLoading(false);
    setPostText('');
    setSelectedFile(null);
    setImageFileUrl(null);
    location.reload();
  }

  const loadingText = 'Uploading...';

  if (!session) return null
  return (
    <>
      <div className='flex items-center justify-between p-3 sm:hidden'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
        {!session ? (
          <p onClick={() => signIn()}><HiUserAdd className='w-9 h-9 text-primaryRed p-1.5 rounded-full bg-gray-200' /></p>
        ) : (
          <p onClick={() => signOut()}><HiUserRemove className='w-9 h-9 text-primaryRed p-1.5 rounded-full bg-gray-200' /></p>
        )}
        <p>Theme</p>
      </div>
      <div className='flex border border-gray-200 p-3 space-x-3 w-full'>
        <Image
          src={session.user.image}
          alt={session.user.username}
          width={100}
          height={100}
          className='rounded-full w-11 h-11 cursor-pointer hover:brightness-95 transition-all duration-200'
        />
        <div className='w-full divide-y divide-gray-200'>
          <textarea
            className='w-full border-none outline-none tracking-wide min-h-[3rem] py-2 text-gray-700'
            rows={2}
            placeholder={`How can we help, ${session.user.name.split(' ')[0]}?`}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>

          {selectedFile && (
            <img
              src={imageFileUrl}
              alt='image'
              className={`w-full max-h-[16rem] object-cover cursor-pointer ${imageFileUploading ? 'animate-pulse' : ''}`} />
          )}
          <div className='flex items-center justify-between pt-2.5'>
            <div className='flex items-center'>
              <div title="Add An Image">
                <HiOutlinePhoto onClick={() => imagePickRef.current.click()} className='h-10 w-10 p-2 text-primaryRed hover:bg-secondaryRed hover:text-neutral-700 transition duration-200 rounded-full cursor-pointer' />
                <input type='file' ref={imagePickRef} accept='image/*' onChange={addImageToPost} hidden />
              </div>
            </div>
            <button
              disabled={postText.trim() === '' || postLoading || imageFileUploading}
              className='px-4 py-1 text-primaryRed font-bold hover:bg-secondaryRed hover:text-neutral-700 rounded-md transition duration-200 disabled:opacity-50 cursor-pointer'
              onClick={handleSubmitPost}
            >Post
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPostInput