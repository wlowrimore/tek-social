'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import getTechNews from '../utils/getTechNews'
import Image from 'next/image';
import { HiMiniPlus, HiMiniMinus } from 'react-icons/hi2';
const News = () => {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(5);
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getTechNews();
      console.log("NEWS DATA,", data)
      setNews(data?.results || []);
    }
    fetchNews();
  }, [])

  useEffect(() => {
    const cleanedUrl = news?.map((article) => article?.multimedia?.[0]?.url.split(','));
  }, [news])

  return (
    <div className='text-gray-700 space-y-3 rounded-b py-4 px-4 w-[20rem] h-screen overflow-y-scroll'>
      <h4 className='font-bold text-xl text-gray-800 dark:text-gray-200 px-4'>The Latest in Tech News</h4>
      {news?.slice(0, articleNum).map((article, index) => (
        <div key={article.url}>
          <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 dark:hover:bg-neutral-700/50 transition-all duration-200'>
            <Link href={article.url} target='_blank' rel='noreferrer noopener' className='space-y-0.5'>
              <h6 className='text-sm text-gray-800 dark:text-gray-200 font-bold'>{article.title}</h6>
              <p className='text-xs font-medium text-gray-500 dark:text-gray-400'>{article.byline}
                <span className='italic text-gray-500/80 text-[0.65rem] dark:text-gray-400/80'>  &#40;{new Date(article.published_date).toLocaleString().split(',')[0]}&#41;</span></p>
            </Link>
            <div className='flex items-center max-w-14 max-h-10'>
              <Link href={article.url} target='_blank' rel='noreferrer noopener'>
                <Image
                  src={article.multimedia[0]?.url}
                  alt={article.title}
                  width={100}
                  height={100}
                  className='rounded-2xl object-cover' />
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className='w-full flex items-center justify-between pt-6'>
        <button onClick={() => setArticleNum(articleNum + 3)} className='flex items-center text-indigo-600 dark:text-sky-400 text-sm px-4 pb-8 hover:text-indigo-500/80 dark:hover:text-secondaryRed transition duration-200'>Load More&nbsp;<span> <HiMiniPlus /></span></button>
        <button onClick={() => setArticleNum(articleNum - 3)} className='flex items-center text-neutral-950 text-end dark:text-red-400 text-sm px-4 pb-8 hover:text-indigo-500/80 dark:hover:text-secondaryRed transition duration-200'>Show Less&nbsp;<span>  <HiMiniMinus /></span></button>
      </div>
    </div>
  )
}

export default News