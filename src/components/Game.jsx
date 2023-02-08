import { useEffect, useState } from "react";
import axios from "axios";
import he from "he";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";

import Question from "./Question";

export default function Game() {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("gameRunning");

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=6&difficulty=easy&type=multiple`)
      .then((response) => createQuestions(response.data.results));
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
        isAnswered: false,
        isAnsweredCorrectly: false,
      };
    });
    setQuestions(nextQuestions);
  }

  function handleCheckAnswer(answerId) {
    const correctAnswer = questions[currentQuestion].answers.filter(
      (answer) => answer.isCorrect === true
    )[0];
    if (answerId === correctAnswer.id) {
      setScore((prevScore) => prevScore + 1);
      const nextQuestions = [...questions];
      nextQuestions[currentQuestion].isAnswered = true;
      nextQuestions[currentQuestion].isAnsweredCorrectly = true;
      setQuestions(nextQuestions);

      console.log("You selected the right answer!");
    } else {
      const nextQuestions = [...questions];
      nextQuestions[currentQuestion].isAnswered = true;
      nextQuestions[currentQuestion].isAnsweredCorrectly = false;
      setQuestions(nextQuestions);

      console.log("You've selected incorrect answer :(");
    }

    if (currentQuestion === 5) {
      setGameState("gameEnded");
    }
  }

  console.log(gameState);

  function handleNextQuestion() {
    if (currentQuestion < 5) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  }

  console.log(questions);

  if (questions)
    return (
      <div className="flex flex-col gap-8">
        {questions[currentQuestion].isAnswered && (
          <div className="font-medium text-zinc-50">
            {questions[currentQuestion].isAnsweredCorrectly
              ? "Correct!"
              : "Wrong :("}
          </div>
        )}
        <h3 className="font-medium text-zinc-50">
          Question {currentQuestion + 1} / 6
        </h3>
        <h3 className="font-medium text-zinc-50">Score: {score}</h3>
        <Question
          question={questions[currentQuestion]}
          handleCheckAnswer={handleCheckAnswer}
          handleNextQuestion={handleNextQuestion}
        />
      </div>
    );
}
