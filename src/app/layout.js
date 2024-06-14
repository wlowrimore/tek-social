import { Inter } from "next/font/google";
import "./globals.css";

import SideBar from "./components/SideBar";
import News from "./components/News";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tek Social",
  description: "A social application where developers share their insight, knowledge, and experience of the technical interview process.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex justify-between max-w-7xl mx-auto'>
          <div>
            <SideBar />
          </div>
          <div>
            {children}
          </div>
          <div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}
