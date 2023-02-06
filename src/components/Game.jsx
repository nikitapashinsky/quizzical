import { useEffect, useState } from "react";
import axios from "axios";
import he from "he";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";

import Question from "./Question";

export default function Game() {
  const [questions, setQuestions] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=6&difficulty=easy&type=multiple`)
      .then((response) => createQuestions(response.data.results))
      .catch((error) => setFetchError(error));
  }, []);

  function createQuestions(data) {
    const nextQuestions = data.map((question) => {
      // combine incorrect answers array with correct answer
      const combinedAnswers = question.incorrect_answers.concat(
        question.correct_answer
      );
      // Create Answer object and shuffle answers array
      const answers = shuffle(
        combinedAnswers.map((answer) => {
          return {
            id: nanoid(),
            answer: answer,
            isCorrect: combinedAnswers.indexOf(answer) === 3 ? true : false,
            isSelected: false,
          };
        })
      );

      // Create Question object
      return {
        id: nanoid(),
        question: he.unescape(question.question), // convert special characters
        category: question.category,
        answers: answers,
      };
    });
    setQuestions(nextQuestions);
  }

  console.log(questions);

  if (questions)
    return (
      <div className="">
        <Question question={questions[currentQuestion]} />
      </div>
    );
}
