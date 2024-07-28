import SignInComponent from '../components/SignInComponent';
import React from "react";

const page = () => {
  return (
    <div className='max-w-xl mx-auto border-r border-l dark:border-none min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 dark:px-0 sticky top-24 z-50 bg-white'>
        <SignInComponent />
      </div>
    </div>
  )
};

export default page;