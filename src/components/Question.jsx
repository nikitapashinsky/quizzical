import Answer from "./Answer";
import Button from "./Button";

export default function Question({
  question,
  currentQuestionIndex,
  selectedAnswerId,
  handleSelectAnswer,
  handleCheckAnswer,
  handleNextQuestion,
}) {
  let buttonLabel;
  if (!question.isAnswered) {
    buttonLabel = "Check answer";
  } else if (question.isAnswered && currentQuestionIndex < 5) {
    buttonLabel = "Next question";
  } else if (question.isAnswered && currentQuestionIndex === 5) {
    buttonLabel = "Finish game";
  }

  return (
    <div className="flex h-full w-full grow flex-col items-center justify-center gap-16">
      {/* <div className="relative flex h-3 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          className={`absolute block h-full w-${
            currentQuestionIndex < 5 && currentQuestionIndex + 1
          }/6 ${currentQuestionIndex === 5 && `w-full`} bg-sky-500`}
        ></div>
      </div> */}
      <h1 className="max-w-xs text-center text-2xl font-bold text-stone-800">
        {question.question}
      </h1>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex w-full flex-1 grow-0 flex-col justify-center gap-8"
      >
        <ul className="flex w-full flex-col justify-center gap-3">
          {question.answers.map((answer, index) => {
            return (
              <Answer
                question={question}
                key={index}
                answer={answer}
                selectedAnswerId={selectedAnswerId}
                handleSelectAnswer={handleSelectAnswer}
              />
            );
          })}
        </ul>
        <Button
          disabled={!question.answers.some((answer) => answer.isSelected)}
          handleClick={() => {
            !question.isAnswered
              ? handleCheckAnswer(selectedAnswerId)
              : handleNextQuestion(selectedAnswerId);
          }}
        >
          {buttonLabel}
        </Button>
      </form>
    </div>
  );
}
