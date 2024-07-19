import React from 'react'
import MainPostInput from './components/MainPostInput'
import Feed from './components/Feed'
import SideBar from './components/SideBar'
import SmallScreenAuthLinks from './components/UI/SmallScreenAuthLinks'
import SearchInput from './components/UI/SearchInput'
import News from './components/News'

export default function page() {
  return (
    // <div className='max-w-xl mx-auto border-l border-r min-h-screen'>
    <div className='flex max-w-7xl mx-auto'>
      <div className='hidden sm:inline border-r dark:border-none h-screen sticky bottom-0 top-0'>
        <SideBar />
      </div>
      {/* <div className='flex flex-col py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <div>
          <SmallScreenAuthLinks />
        </div>
      </div> */}
      <div className='border border-r h-screen w-full overflow-y-scroll'>
        {/* <h2 className='bg-white text-lg sm:text-xl font-bold'>Home</h2> */}
        <MainPostInput />
        <Feed />
      </div>
      <div className='lg:flex-col p-3 h-screen border-l hidden lg:flex w-[52rem]'>
        <div className='sticky top-0 pb-1'>
          <SearchInput />
        </div>
        <News />
      </div>
    </div>
  )
}
