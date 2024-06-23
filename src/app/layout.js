import { Manrope } from "next/font/google";
import "./globals.css";

import SideBar from "./components/SideBar";
import News from "./components/News";
import SessionWrapper from "./components/SessionProvider";
import CommentModal from "./components/CommentModal";
import SearchInput from "./components/UI/SearchInput";
import NewsModal from "./components/NewsModal";
import Copyright from "./components/UI/Copyright";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "Tek Social",
  description: "A social application where developers share their insight, knowledge, and experience of the technical interview process.",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={manrope.className}>
          <div className='flex justify-between max-w-7xl mx-auto'>
            <div className='hidden sm:inline border-r h-screen sticky bottom-0 top-0'>
              <SideBar />
            </div>
            <div className='w-2xl flex-1'>
              {children}
              <div className='w-full fixed bottom-0 left-[50%] z-80'>
                <Copyright />
              </div>
            </div>
            <div className='lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]'>
              <div className='sticky top-0 bg-white py-2'>
                <SearchInput />
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
