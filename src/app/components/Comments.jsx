'use client'

import { useEffect, useState } from 'react'
import { app } from '../../firebase';
import { getFirestore, doc, getDoc, onSnapshot, query, collection, orderBy } from 'firebase/firestore'
import CommentDetails from './CommentDetails';

export default function Comments({ id }) {
  const [comments, setComments] = useState([])
  const db = getFirestore(app)

  useEffect(() => {
    onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
      setComments(snapshot.docs)
    })
  }, [db, id])

  return (
    <div>
      {comments.map((comment) => (
        <CommentDetails key={comment.id} comment={comment.data()} commentId={comment.id} originalPostId={id} />
      ))}
    </div>
  )
}
