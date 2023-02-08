import { useState } from "react";
import Answer from "./Answer";
import Button from "./Button";

export default function Question({
  question,
  handleSelectAnswer,
  handleCheckAnswer,
  handleNextQuestion,
}) {
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  function handleSelectAnswer(answerId) {
    setSelectedAnswerId(answerId);
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
      {}
      <Button
        handleClick={
          !question.isAnswered ? handleCheckAnswer : handleNextQuestion
        }
        selectedAnswerId={selectedAnswerId}
      >
        {!question.isAnswered ? "Check answer" : "Next question"}
      </Button>
    </div>
  );
}
