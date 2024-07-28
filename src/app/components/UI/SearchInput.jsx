'use client';

import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { commentModalState } from '../../../atom/modalAtom'
import { searchTechNews } from '../../utils/getTechNews';
import Link from 'next/link';
import NewsModal from '../NewsModal';

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [errMsg, setErrMsg] = useState('');
  const [open, setOpen] = useRecoilState(commentModalState)

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    console.log("SEARCH QUERY", searchQuery)
    try {
      setOpen(true)
      const data = await searchTechNews(searchQuery);
      console.log("SEARCHED NEWS DATA,", data)

      setSearchResults(data?.response?.docs || []);
    } catch (error) {
      console.error("Error fetching data:", error);

      setErrMsg(error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-full px-4'>
        <input
          type='text'
          name='search'
          value={searchQuery}
          onChange={handleChange}
          placeholder='Keyword Search'
          className='bg-gray-100 dark:bg-neutral-700/50 dark:border-none border border-gray-200 text-sm w-full rounded-t outline-none px-4 py-2 placeholder:text-[0.9rem] placeholder:tracking-wider dark:placeholder:text-secondaryRed dark:placeholder:opacity-70' />
      </form>
      <NewsModal open={open} setOpen={setOpen} searchResults={searchResults} setSearchResults={setSearchResults} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </>
  )
}
