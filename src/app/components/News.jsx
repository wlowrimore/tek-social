'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import getTechNews from '../utils/getTechNews'
import Image from 'next/image';

const News = () => {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getTechNews();
      setNews(data.articles);
    }
    fetchNews();
  }, [])
  return (
    <div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2'>
      <h4 className='font-bold text-xl px-4'>The Latest in Tech News</h4>
      {news?.slice(0, articleNum).map((article, index) => (
        <div key={article.url}>
          <a href={article.url} target='_blank' rel='noreferrer noopener'>
            <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition-all duration-200'>
              <div className='space-y-0.5'>
                <h6 className='text-sm font-bold'>{article.title}</h6>
                <p className='text-xs font-medium text-gray-500'>{article.source.name}
                  <span className='italic text-gray-500/80 text-[0.65rem]'>  &#40;{new Date(article.publishedAt).toLocaleString().split(',')[0]}&#41;</span></p>

              </div>
              <img src={article.urlToImage} alt='photo' width={70} className='rounded-xl' />
            </div>
          </a>
        </div>
      ))}
      <button onClick={() => setArticleNum(articleNum + 3)} className='text-indigo-600 text-sm px-4 pb-8 hover:text-indigo-500/80 transition duration-200'>Load More</button>
    </div>
  )
}

export default News