import { motion } from "framer-motion";
import { toString } from "lodash";
import { forwardRef } from "react";
import { Button } from "./Button";

const End = forwardRef(({ score, handleEndClick, questions }, ref) => {
  const sortedAnswers = questions.map(({ answers }) => {
    return [...answers].sort(
      (a, b) => Number(b.isCorrect) - Number(a.isCorrect)
    );
  });
  sortedAnswers.map((answer) => {
    answer.map(({ answer, isCorrect, isSelected }) => {
      console.log(answer, isCorrect, isSelected);
    });
  });
  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-medium text-stone-500">You've got</h2>
        <h1 className="max-w-xs text-center font-serif text-6xl font-extrabold tracking-tighter text-stone-800">
          {score} / 6
        </h1>
        <h2 className="text-center text-lg font-medium text-stone-500">
          questions correct!
        </h2>
      </div>
      <div className="flex flex-col gap-4 rounded-[20px] border-2 border-stone-200 bg-white p-6">
        {questions.map(({ question, answers }) => {
          return (
            <div className="flex flex-col gap-4 border-t-2 border-stone-100 pt-4 first:border-0 first:pt-0">
              <h3 className="font-semibold text-stone-600">{question}</h3>
              <div className="flex flex-wrap gap-3">
                {answers
                  .sort(
                    (a, b) =>
                      Number(b.isSelected) - Number(a.isSelected) ||
                      Number(b.isCorrect) - Number(a.isCorrect)
                  )
                  .map(({ answer, isCorrect, isSelected }) => {
                    return (
                      <p
                        className={`rounded-lg px-2 py-1 text-sm font-semibold
                      ${
                        isCorrect
                          ? ` bg-[#449933]/10 text-[#449933]`
                          : !isCorrect && isSelected
                          ? "bg-[#CF5A33]/10 text-[#CF5A33]"
                          : "bg-stone-100 text-stone-400"
                      }
                    `}
                      >
                        {answer}
                      </p>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full flex-col gap-4">
        <Button variant="primary" handleClick={() => handleEndClick("game")}>
          Play again
        </Button>
        <Button variant="secondary" handleClick={() => handleEndClick("start")}>
          Return to menu
        </Button>
      </div>
    </div>
  );
});

const MotionEnd = motion(End);
export default MotionEnd;
