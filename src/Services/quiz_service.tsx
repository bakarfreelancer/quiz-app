import { QuestionType, QuizType } from './../Types/quiz_types';


const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

export const getQuizDetails = async (totalQuestions: number, level: string, category: string): Promise<QuizType[]> => {
    if (level === 'any' && category === 'any') {
        const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple`);
        let { results } = await res.json();

        const quiz: QuizType[] = results.map((questionObj: QuestionType) => {
            return {
                question: questionObj.question,
                answer: questionObj.correct_answer,
                correct_answer: questionObj.correct_answer,
                option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
            }
        })
        return quiz;
    } else if (level === 'any' || category === 'any') {
        if (level === 'any') {
            const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&type=multiple`);
            let { results } = await res.json();

            const quiz: QuizType[] = results.map((questionObj: QuestionType) => {
                return {
                    question: questionObj.question,
                    answer: questionObj.correct_answer,
                    correct_answer: questionObj.correct_answer,
                    option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
                }
            })
            return quiz;
        } else {
            const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`);
            let { results } = await res.json();

            const quiz: QuizType[] = results.map((questionObj: QuestionType) => {
                return {
                    question: questionObj.question,
                    answer: questionObj.correct_answer,
                    correct_answer: questionObj.correct_answer,
                    option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
                }
            })
            return quiz;
        }
    } else {
        const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${level}&type=multiple`);
        let { results } = await res.json();

        const quiz: QuizType[] = results.map((questionObj: QuestionType) => {
            return {
                question: questionObj.question,
                answer: questionObj.correct_answer,
                correct_answer: questionObj.correct_answer,
                option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
            }
        })
        return quiz;
    }
    // return ([{
    //     question: 'string',
    //     answer: 'string',
    //     option: ['string[]'],
    //     correct_answer: 'string'
    // }]);
}