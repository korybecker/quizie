import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
    const { title, description, questions } = req.body;


    const uploadedQuiz = await prisma.quiz.create({
        data: { 
            title, 
            creator: {
                connect: { id: 'cldmbiid70000v04g5jsij7px'}
            } 
        },
    });
    console.log(uploadedQuiz);

    
    const uploadedQuestions = [];
    for (const question of questions) {
        const createdQuestion = await prisma.question.create({
            data: {
                text: question.text,
                quizId: uploadedQuiz.id,
            }
        })
        uploadedQuestions.push(createdQuestion);
    }

    const uploadedOptions = []
    for (const question of questions) {
        const optionsForQuestion = [];
        for (const option of question.options) {
            const createdOption = await prisma.option.create({
                data: {
                    text: option.text,
                    question: {
                        connect: { id: uploadedQuestions[questions.indexOf(question)].id }
                    }
                }
            })
            optionsForQuestion.push(createdOption);
            uploadedOptions.push(createdOption);
            
            await prisma.answer.create({
                data: {
                    isCorrect: question.options[optionsForQuestion.indexOf(createdOption)].isAnswer,
                    option: {
                        connect: { id: createdOption.id }
                    }
                }
            })
        }
    }

    // const uploadedQuestions = await prisma.question.createMany({
    //     data: questions.map((question) => {
    //         return {
    //             text: question.text,
    //             quizId: uploadedQuiz.id,
    //         }
    //     })
    // })

    console.log(uploadedQuestions);

    
    // const uploadedOptions = await Promise.all(
    //     questions.map(async (question) => {
  
    //         const optionsForQuestion = await prisma.option.createMany({
    //             data: question.options.map((option) => {
    //                 return {
    //                     text: option.text,
    //                     question: {
    //                         connect: { id: uploadedQuestions[questions.indexOf(question)].id }
    //                     }
    //                 }
    //             })
    //         })
  
    //         await Promise.all(
    //             optionsForQuestion.map(async (createdOption) => {
    //                 await prisma.answer.create({
    //                     data: {
    //                         isCorrect: question.options[optionsForQuestion.indexOf(createdOption)].isAnswer,
    //                         option: {
    //                             connect: { id: createdOption.id }
    //                         }
    //                     }
    //                 })
    //             })
    //         )
  
    //         return optionsForQuestion
    //     })
    // )
    console.log(uploadedQuiz)
    console.log(uploadedQuestions)
    console.log(uploadedOptions)
    res.status(200).json({ quiz: uploadedQuiz, questions: uploadedQuestions, options: uploadedOptions });
}