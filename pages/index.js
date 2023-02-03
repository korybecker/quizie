import Head from 'next/head'
import prisma from '../lib/prisma';
import QuizBlock from '@/components/QuizBlock';

export const getStaticProps = async () => {
  const posts = await prisma.quiz.findMany({
    where: { published: false },
    include: {
      creator: {
        select: { name: true },
      },
    },
  })
  const allPosts = JSON.stringify(posts)
  return {
    props: { allPosts },
    revalidate: 10
  }
}

export default function Home({allPosts}) {
  allPosts = JSON.parse(allPosts)
  return (
    <>
      <Head>
        <title>Quizie</title>
        <meta name="description" content="Quiz maker and taker app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Quizies</h1>
      <div>
        {allPosts.map((post, i) => {
          return (
            <QuizBlock key={i} post={post} />
          )
        })}
      </div>
    </>
  )
}
