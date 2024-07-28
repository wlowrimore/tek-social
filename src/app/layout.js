import { Manrope } from "next/font/google";
import "./globals.css";
import SideBar from "./components/SideBar";
import News from "./components/News";
import SessionWrapper from '../providers/SessionProvider'
import CommentModal from "./components/CommentModal";
import SearchInput from "./components/UI/SearchInput";
import NewsModal from "./components/NewsModal";
import Copyright from "./components/UI/Copyright";
import { ThemeProvider } from "next-themes";
import { Providers } from "./providers";

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
          <Providers>
            <div className='flex justify-between max-w-7xl mx-auto'>
              <div className='w-2xl flex-1'>
                {children}
                <div className='w-full fixed bottom-0 left-[50%] z-80'>
                  <Copyright />
                </div>
              </div>
            </div>
          </Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
