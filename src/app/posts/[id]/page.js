import { app } from '../../../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { HiArrowLeft } from 'react-icons/hi'
import Link from 'next/link'
import Post from '../../components/Post'
import Comments from '../../components/Comments'
export default async function PostPage({ params }) {
  const db = getFirestore(app)
  let data = {};
  const querySnapshot = await getDoc(doc(db, 'posts', params.id));
  data = { ...querySnapshot.data(), id: querySnapshot.id };

  console.log("Data in PostPage:", data)

  return (
    <div className='max-w-xl mx-auto border-r dark:border-none border-l min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b dark:bg-neutral-900 border-gray-200'>
        <Link href='/' className='hover:bg-gray-100 rounded-full p-2'><HiArrowLeft className='h-5 w-5 dark:text-neutral-200 dark:hover:text-neutral-800' />
        </Link>
        <h2 className='sm:text-lg dark:text-neutral-200 font-bold'>Back</h2>
      </div>
      <Post post={data} id={data.id} />
      <Comments id={params.id} />
    </div>
  )
}
