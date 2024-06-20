'use client';

import { useEffect, useState } from 'react'
import Modal from 'react-modal'

import { HiX } from 'react-icons/hi'
import Link from 'next/link';
import Image from 'next/image';

export default function NewsModal({ open, setOpen, searchResults, searchQuery }) {
  const [articleNum, setArticleNum] = useState(5);

  const shortenedUrl = 'https://nytimes.com/';

  function truncateSnippet(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + '...';
    }
  }

  function closeModal() {
    setOpen(false);
    setArticleNum(5);
  }

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className='max-w-2xl w-[80%] max-h-[70%] absolute top-48 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-y-scroll'
        >
          <div className='pt-4'>
            <div className='border-b border-gray-200 py-2 px-1.5'>
              <HiX className='text-2xl trct-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer'
                onClick={closeModal}
              />
              {searchQuery && (
                <h4 className='text-gray-700 font-light px-10 mt-4 text-lg'>Showing Results for <span className='font-bold'>&quot;{searchQuery}&quot;</span></h4>
              )}
            </div>
            <div className='py-3'>
              {searchResults.slice(0, articleNum)?.map((result, index) => (
                <div key={result.web_url} className='px-11 py-1'>
                  <Link href={result.web_url} className='flex justify-between space-y-4 border-2 border-gray-300 pl-3 rounded-xl hover:bg-gray-200 transition duration-200'>
                    <div className='flex flex-col justify-center'>
                      <p className='font-bold'>{(truncateSnippet(result.headline.main, 60))}</p>
                      <p className='text-sm'>{truncateSnippet(result.snippet, 60)}</p>
                    </div>
                    <div className='pb-3 pr-3'>
                      {result.multimedia[0] ? (
                        <Image
                          src={`${shortenedUrl}${result.multimedia[0]?.url}`}
                          alt="news-img"
                          width={50}
                          height={50}
                          className='w-20 rounded-xl'
                        />
                      ) :
                        <div className='w-20 text-sm text-center bg-gray-200 rounded-xl p-2'>
                          <p>No image available</p>
                        </div>
                      }
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className='p-2 flex items-center space-x-1 relative'>
              <button onClick={() => setArticleNum(articleNum + 5)} className='text-sm text-sky-600 w-fit ml-7 px-2 pb-4 hover:opacity-70 transition duration-200'>Load More</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
