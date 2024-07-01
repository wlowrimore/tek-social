'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { app } from '../../../firebase'
import { useRecoilState } from 'recoil'
import { userLocationInput, userSkillsInput, bioInput, linkedInUrlInput, gitHubUrlInput, portfolioUrlInput, profileDetailsState } from '../../../atom/profileDetailsAtom'

export default function ProfileDetailsForm({ setOpen, setDetailsOpen }) {
  const { data: session } = useSession();
  const db = getFirestore(app);

  const [profileLoading, setProfileLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userLocation, setUserLocation] = useRecoilState(userLocationInput);
  const [userSkills, setUserSkills] = useRecoilState(userSkillsInput);
  const [bio, setBio] = useRecoilState(bioInput);
  const [linkedInUrl, setLinkedInUrl] = useRecoilState(linkedInUrlInput);
  const [gitHubUrl, setGitHubUrl] = useRecoilState(gitHubUrlInput);
  const [portfolioUrl, setPortfolioUrl] = useRecoilState(portfolioUrlInput);
  const [detailsComplete, setDetailsComplete] = useRecoilState(profileDetailsState);

  const limit = 2000;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userLocation') {
      setUserLocation(value);
    } else if (name === 'userSkills') {
      const skills = value.split(",").map((skill) => skill.trim());
      setUserSkills(skills);
    } else if (name === 'bio') {
      setBio(value);
    } else if (name === 'linkedInUrl') {
      setLinkedInUrl(value);
    } else if (name === 'gitHubUrl') {
      setGitHubUrl(value);
    } else if (name === 'portfolioUrl') {
      setPortfolioUrl(value);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);

    console.log("Fields:", { userLocation, userSkills, bio, linkedInUrl, gitHubUrl, portfolioUrl, detailsComplete });

    const docRef = await addDoc(collection(db, 'profile'), {
      profileId: session.user.uid,
      uid: session.user.uid,
      name: session.user.name,
      email: session.user.email,
      skills: userSkills,
      bio: bio,
      image: session.user.image,
      location: userLocation,
      linkedInUrl: linkedInUrl,
      gitHubUrl: gitHubUrl,
      portfolioUrl: portfolioUrl,
      timestamp: serverTimestamp(),
      detailsComplete: detailsComplete
    })

    console.log('User Details:', { userLocation, userSkills, bio, linkedInUrl, gitHubUrl, portfolioUrl, detailsComplete });

    if (!userLocation || userSkills.length > 5 || !bio || !linkedInUrl || !gitHubUrl || !portfolioUrl) {
      setErrorMsg("Please provide your top 5 skills.")
      setDetailsComplete(false);
    } else {
      console.log("All fields are filled!")
      setDetailsComplete(true);
    }

    setUserLocation('');
    setUserSkills([]);
    setBio('');
    setLinkedInUrl('');
    setGitHubUrl('');
    setPortfolioUrl('');
    setProfileLoading(false);
    setOpen(false);
    setDetailsOpen(false);
  }

  return (
    <main className='flex flex-col w-full border-b border-gray-300 pb-6 px-6'>
      <h1 className='text-2xl text-gray-700 font-bold pb-2'>Profile Details</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input
          type='text'
          name='userLocation'
          value={userLocation}
          onChange={handleInputChange}
          placeholder='Add Your Location' className='w-full p-2 outline-none border border-gray-300 bg-white mb-4' />
        <p className='pl-2 text-xs italic font-semibold tracking-wide text-gray-500'>Separate skills with commas.</p>
        <input
          type='text'
          name='userSkills'
          value={userSkills}
          onChange={handleInputChange}
          placeholder='Add Your Top 5 Skills'
          className='w-full p-2 outline-none border border-gray-300 bg-white rounded-lg mb-4'
        />


        <textarea
          maxLength={limit}
          name='bio'
          value={bio}
          onChange={handleInputChange}
          placeholder='Description/Bio'
          rows='5'
          className='w-full p-2 outline-none border border-gray-300 mb-1.5 bg-white rounded-lg'
        />

        <p className='mt-0 text-end text-xs text-gray-500 tracking-wide'>{bio.length} / {limit}</p>

        <p className='text-lg font-semibold text-gray-600'>Add Your Links</p>

        <input
          type='text'
          name='linkedInUrl'
          value={linkedInUrl}
          onChange={handleInputChange}
          placeholder='LinkedIn URL'
          className='w-full p-2 outline-none border border-gray-300 bg-white rounded-lg mb-4' />

        <input
          type='text'
          name='gitHubUrl'
          value={gitHubUrl}
          onChange={handleInputChange}
          placeholder='GitHub URL'
          className='w-full p-2 outline-none border border-gray-300 bg-white rounded-lg mb-4' />

        <input
          type='text'
          name='portfolioUrl'
          value={portfolioUrl}
          onChange={handleInputChange}
          placeholder='Portfolio or Resume URL' className='w-full p-2 outline-none border border-gray-300 bg-white rounded-lg' />

        <button
          type='submit'
          className='bg-neutral-800 text-white text-lg font-bold p-2 my-6 rounded-lg mt-4 hover:bg-neutral-300 hover:text-gray-800 transition duration-200'>
          Update and Save
        </button>
      </form>
    </main>
  )
}
