import { Inter } from "next/font/google";
import "./globals.css";

import SideBar from "./components/SideBar";
import News from "./components/News";
import SessionWrapper from "./components/SessionProvider";
import CommentModal from "./components/CommentModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tek Social",
  description: "A social application where developers share their insight, knowledge, and experience of the technical interview process.",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>

      <html lang="en">
        <body className={inter.className}>
          <div className='flex justify-between max-w-7xl mx-auto'>
            <div className='hidden sm:inline border-r h-screen sticky bottom-0 top-0'>
              <SideBar />
            </div>
            <div className='w-2xl flex-1'>
              {children}
            </div>
            <div className='lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]'>
              <div className='sticky top-0 bg-white py-2'>
                <input type='text' placeholder='Search' className='bg-gray-100 border border-gray-200 text-sm w-full rounded-3xl outline-none px-4 py-2' />
              </div>
              <News />
            </div>
          </div>
          <CommentModal />
        </body>
      </html>
    </SessionWrapper>
  );
}
