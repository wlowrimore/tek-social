'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import getTechNews from '../utils/getTechNews'
import Image from 'next/image';

const News = () => {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(5);
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getTechNews();
      console.log("NEWS DATA,", data)
      setNews(data.results);
    }
    fetchNews();
  }, [])

  useEffect(() => {
    const cleanedUrl = news.map((article) => article?.multimedia?.[0]?.url.split(','));
    console.log("CLEANED URL", cleanedUrl)
  }, [news])






  return (
    <div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2'>
      <h4 className='font-bold text-xl px-4'>The Latest in Tech News</h4>
      {news?.slice(0, articleNum).map((article, index) => (
        <div key={article.url}>
          <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition-all duration-200'>
            <Link href={article.url} target='_blank' rel='noreferrer noopener' className='space-y-0.5'>
              <h6 className='text-sm font-bold'>{article.title}</h6>
              <p className='text-xs font-medium text-gray-500'>{article.byline}
                <span className='italic text-gray-500/80 text-[0.65rem]'>  &#40;{new Date(article.published_date).toLocaleString().split(',')[0]}&#41;</span></p>
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
      <button onClick={() => setArticleNum(articleNum + 3)} className='text-indigo-600 text-sm px-4 pb-8 hover:text-indigo-500/80 transition duration-200'>Load More</button>
    </div>
  )
}

export default News