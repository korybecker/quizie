import prisma from "@/lib/prisma";
import QuizBlock from "@/components/QuizBlock";
import styles from "@/styles/Home.module.css";

export const getStaticProps = async () => {
    const posts = await prisma.quiz.findMany({
        where: { published: false },
        include: {
            creator: {
                select: { name: true },
            },
        },
    });
    const allPosts = JSON.stringify(posts);
    return {
        props: { allPosts },
        revalidate: 10,
    };
};

export default function Quizies({ allPosts }) {
    allPosts = JSON.parse(allPosts);
    return (
        <>
            <div className={styles.container}>
                <h1>Quizies</h1>
                <div>
                    {allPosts.map((post, i) => {
                        return <QuizBlock key={i} post={post} />;
                    })}
                </div>
            </div>
        </>
    );
}
