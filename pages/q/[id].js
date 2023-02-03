import prisma from "@/lib/prisma";

export const getServerSideProps = async ({ params }) => {
    let quiz = await prisma.quiz.findUnique({
      where: {
        id: String(params?.id),
      },
      include: {
        questions: true,
        creator: true
      }
    });
    quiz = JSON.stringify(quiz);
    return {
      props: {quiz},
    };
  };

export default function Quiz({quiz}) {
    quiz = JSON.parse(quiz)
    console.log(quiz)
    return (
        <>
            <h1>Quiz</h1>
            <div>
                {quiz.title} - {quiz.creator.name}
            </div>
        </>
    )
}