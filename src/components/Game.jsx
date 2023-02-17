import { useEffect, useRef, useState } from "react";
import he from "he";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";
import axios from "axios";

import MotionQuestion from "./Question";
import MotionStart from "./Start";
import MotionEnd from "./End";
import { AnimatePresence } from "framer-motion";

export default function Game() {
  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [sessionToken, setSessionToken] = useState("");

  async function getQuestions() {
    console.log("getting questions...");
    axios
      .get(
        `https://opentdb.com/api.php?amount=6${
          categoryId !== 0 ? `&category=${categoryId}` : ""
        }&difficulty=${difficultyLevel}&type=multiple&token=${sessionToken}`
      )
      .then((response) => {
        const data = response.data;
        if (data.response_code === 0) {
          createQuestions(data.results);
        } else if (data.response_code === 4) {
          console.log("you answered all questions");
        }
      })
      .catch((error) => console.log(error));
  }

  async function emptyQuestions() {
    axios
      .get(
        `https://opentdb.com/api_token.php?command=reset&token=${sessionToken}`
      )
      .then((response) => setSessionToken(response.data.token))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api_token.php?command=request`)
      .then((response) => setSessionToken(response.data.token))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getQuestions();
  }, [difficultyLevel, categoryId]);

  useEffect(() => {
    emptyQuestions();
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

  function handleNextQuestion() {
    if (currentQuestionIndex < 5) {
      setCurrentQuestionIndex((prevQuestion) => prevQuestion + 1);
    }

    if (currentQuestionIndex === 5) {
      setGameState("gameEnd");
    }
  }

  function handleStartClick() {
    console.log(difficultyLevel);
    setGameState("game");
  }

  function handleEndClick(state) {
    setQuestions(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    getQuestions();
    setGameState(state);
  }

  function handleSelectDifficulty(level) {
    const nextLevel = level;
    setDifficultyLevel(nextLevel);
    console.log(nextLevel);
  }

  function handleSelectCategory(categoryId) {
    const nextCategoryId = categoryId;
    setCategoryId(nextCategoryId);
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <MotionStart
            layout
            key="start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.15 },
            }}
            transition={{ type: "spring", duration: 1, bounce: 0.25 }}
            categoryId={categoryId}
            handleSelectCategory={handleSelectCategory}
            difficultyLevel={difficultyLevel}
            handleSelectDifficulty={handleSelectDifficulty}
            handleStartClick={handleStartClick}
          />
        )}
        {gameState === "game" && questions && (
          <MotionQuestion
            layout
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswerId={selectedAnswerId}
            handleSelectAnswer={handleSelectAnswer}
            handleCheckAnswer={handleCheckAnswer}
            handleNextQuestion={handleNextQuestion}
          />
        )}

        {gameState === "gameEnd" && (
          <MotionEnd
            key="end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 75, damping: 15 }}
            score={score}
            handleEndClick={handleEndClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}
