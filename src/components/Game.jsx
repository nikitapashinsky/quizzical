import { useEffect, useRef, useState } from "react";
import he from "he";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";
import axios from "axios";

import Question from "./Question";
import Start from "./Start";
import End from "./End";

export default function Game() {
  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [sessionToken, setSessionToken] = useState("");
  const refGameState = useRef(gameState);

  async function getQuestions() {
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
        } else {
          resetToken();
        }
      })
      .catch((error) => console.log(error));
  }

  async function resetToken() {
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
    if (refGameState.current === gameState) return;
    refGameState.current = gameState;
    getQuestions();
  }, [gameState]);

  useEffect(() => {
    resetToken();
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
      {gameState === "start" && (
        <Start
          categoryId={categoryId}
          handleSelectCategory={handleSelectCategory}
          difficultyLevel={difficultyLevel}
          handleSelectDifficulty={handleSelectDifficulty}
          handleStartClick={handleStartClick}
        />
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
        <End score={score} handleEndClick={handleEndClick} />
      )}
    </>
  );
}
