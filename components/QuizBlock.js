import Link from "next/link"

export default function QuizBlock({post}) {
  return (
    <>
      <h1><Link href={`/q/${post.id}`}>{post.title}</Link></h1>
      <p><Link href={`/u/${post.creatorId}`}>{post.creator.name}</Link></p>
    </>
  )
}