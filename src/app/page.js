import React from 'react'
import MainPostInput from './components/MainPostInput'

export default function page() {
  return (
    <div className='max-w-xl mx-auto border-l border-r min-h-screen'>
      <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
      </div>
      <div>
        <MainPostInput />
      </div>
    </div>
  )
}
