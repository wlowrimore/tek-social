import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '../../firebase'
import Post from './Post'
import CommentModal from './CommentModal';

export default async function Feed() {
  const db = getFirestore(app)
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  })
  console.log("Data in Feed:", data)
  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post} id={post.id} />
      ))}
      <CommentModal />
    </div>
  )
}
