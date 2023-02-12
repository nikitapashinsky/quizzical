import { useEffect, useState } from "react";
import axios from "axios";
import he from "he";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";

import Question from "./Question";

export default function Game() {
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState("start"); // start, game, gameEnd
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  async function getQuestions() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://opentdb.com/api.php?amount=6&difficulty=easy&type=multiple`
      );
      const response = res;
      setLoading(false);
      const data = await response.json();
      createQuestions(data.results);
    } catch {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuestions();
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
            answer: he.unescape(answer),
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

  function handleSelectAnswer(answerId) {
    setSelectedAnswerId(answerId);
    questions[currentQuestionIndex].answers.filter((answer) => {
      if (answer.id === answerId) {
        return (answer.isSelected = true);
      } else {
        return (answer.isSelected = false);
      }
    });
    console.log(questions[currentQuestionIndex].answers);
  }

  function handleCheckAnswer(answerId) {
    const correctAnswer = questions[currentQuestionIndex].answers.filter(
      (answer) => answer.isCorrect === true
    )[0];

    const nextQuestions = [...questions];
    nextQuestions[currentQuestionIndex].isAnswered = true;
    nextQuestions[currentQuestionIndex].isAnsweredCorrectly =
      answerId === correctAnswer.id;
    setQuestions(nextQuestions);

    answerId === correctAnswer.id
      ? setScore((score) => score + 1)
      : setScore(score);
  }

  console.log(gameState);

  function handleNextQuestion() {
    if (currentQuestionIndex < 5) {
      setCurrentQuestionIndex((prevQuestion) => prevQuestion + 1);
    }

    if (currentQuestionIndex === 5) {
      setGameState("gameEnd");
    }
  }

  return (
    <>
      {loading && <p>Loading…</p>}
      {gameState === "start" && (
        <div>
          <button
            onClick={() => setGameState("game")}
            className="flex items-center justify-center self-center rounded-full bg-sky-400 px-10 py-4 text-lg font-semibold text-white hover:bg-sky-500 active:bg-sky-500"
          >
            Start the game
          </button>
        </div>
      )}
      {gameState === "game" && questions && (
        <>
          <Question
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswerId={selectedAnswerId}
            handleSelectAnswer={handleSelectAnswer}
            handleCheckAnswer={handleCheckAnswer}
            handleNextQuestion={handleNextQuestion}
          />
        </>
      )}
      {gameState === "gameEnd" && (
        <div className="flex flex-col items-center justify-center gap-12">
          <h1 className="max-w-xs text-center text-2xl font-bold text-stone-800">
            You answered correctly {score}&nbsp;out of 6 questions!
          </h1>
          <button
            onClick={() => {
              setQuestions(null);
              setCurrentQuestionIndex(0);
              setScore(0);
              getQuestions();
              setGameState("game");
            }}
            className="flex items-center justify-center self-center rounded-full bg-sky-400 px-10 py-4 text-lg font-semibold text-white hover:bg-sky-500 active:bg-sky-500"
          >
            Play again?
          </button>
        </div>
      )}
    </>
  );
}
