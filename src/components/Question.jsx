import { useState } from "react";
import Answer from "./Answer";
import Button from "./Button";
export default function Question({ question }) {
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  function handleSelectAnswer(answerId) {
    setSelectedAnswerId(answerId);
  }

  function handleCheckAnswer(answerId) {
    const correctAnswer = question.answers.filter(
      (answer) => answer.isCorrect === true
    )[0];
    if (answerId === correctAnswer.id) {
      console.log("You selected the right answer!");
    } else {
      console.log("You've selected incorrect answer :(");
    }
  }

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-3xl font-medium dark:text-zinc-50">
        {question.question}
      </h1>
      <ul className="flex flex-col gap-4">
        {question.answers.map((answer, index) => {
          return (
            <Answer
              key={index}
              answer={answer}
              selectedAnswerId={selectedAnswerId}
              handleSelectAnswer={handleSelectAnswer}
            />
          );
        })}
      </ul>
      <Button
        handleClick={handleCheckAnswer}
        selectedAnswerId={selectedAnswerId}
      >
        Check answer
      </Button>
    </div>
  );
}
