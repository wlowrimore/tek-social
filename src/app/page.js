import React from 'react'
import MainPostInput from './components/MainPostInput'
import Feed from './components/Feed'
import SideBar from './components/SideBar'
import SmallScreenAuthLinks from './components/UI/SmallScreenAuthLinks'
import SearchInput from './components/UI/SearchInput'
import News from './components/News'

export default function page() {
  return (
    <div className='flex max-w-7xl mx-auto'>
      <div className='hidden sm:inline border-r dark:border-none h-screen sticky bottom-0 top-0'>
        <SideBar />
      </div>
      <div className='border border-r dark:border-none h-screen w-full overflow-y-scroll mx-10'>
        <MainPostInput />
        <Feed />
      </div>
      <div className='lg:flex-col py-14 h-screen border-l dark:border-none hidden lg:flex w-[52rem]'>
        <div className='sticky top-0 pb-1 w-full px-3'>
          <SearchInput />
        </div>
        <div>
          <News />
        </div>
      </div>
    </div>
  )
}
