import Image from "next/image";
import Link from "next/link";
import LogoNoText from '../../../../public/images/site-logo-trans-no-text.webp'

const CancelBtn = () => {
  return (
    <div className="flex items-center px-4 py-2.5">
      <Link
        href="/"
        className="text-md text-gray-800 font-semibold"
      >
        <Image
          src={LogoNoText}
          alt="site logo"
          width={76}
          height={76}
          className='absolute py-2.5 p-1 rounded-full opacity-60'
        />
        <p className="w-1/4 text-center relative top-[2.1rem] right-1  hover:opacity-40 transition duration-300 font-bold leading-5 text-gray-700 text-2xl bg-white/40">Browse</p>
      </Link>
    </div>
  );
};

export default CancelBtn;