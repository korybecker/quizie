import prisma from "@/lib/prisma";

export const getServerSideProps = async ({ params }) => {
    let post = await prisma.quiz.findUnique({
      where: {
        id: String(params?.id),
      },
      include: {
        creator: {
          select: { name: true },
        },
      },
    });
    post = JSON.stringify(post);
    return {
      props: {post},
    };
  };

export default function Quiz({post}) {
    post = JSON.parse(post)
    return (
        <>
            <h1>Quiz</h1>
            <div>
                {post.title} - {post.creator.name}
            </div>
        </>
    )
}