import prisma from "@/lib/prisma";

export const getServerSideProps = async ({ params }) => {
    let user = await prisma.user.findUnique({
        where: { id: params.id }
      });
      let quizzes = await prisma.quiz.findMany({
        where: { creatorId: params.id },
        include: {
          creator: {
            select: { name: true },
          },
        },
      });
      user = JSON.stringify(user);
      quizzes = JSON.stringify(quizzes);
      return {
        props: { user, quizzes },
      };
  };

export default function Profile({user, quizzes}) {
    user = JSON.parse(user);
    quizzes = JSON.parse(quizzes);

    return (
        <>
            <h1>{user.name}'s Profile</h1>
            <div>
                {quizzes.map((quiz, i) => {
                    return (
                        <div key={i}>{quiz.title}</div>
                    )
                })}
            </div>
        </>
    )
}