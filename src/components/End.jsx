import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Button } from "./Button";

const End = forwardRef(({ score, handleEndClick, questions }, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center gap-6 py-20">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Your score
          </h2>
          <h1 className="max-w-xs text-center font-serif text-6xl font-extrabold tracking-tighter text-stone-800">
            {score} / 6
          </h1>
        </div>
        <p className="max-w-xs text-center text-sm font-medium text-stone-500 md:text-base">
          I hope you had fun and learned something&nbsp;new :)
        </p>
      </div>
      <motion.div
        layout
        className="flex w-full flex-col gap-8 rounded-[20px] border-2 border-stone-200 bg-white p-6 pb-8"
      >
        {questions.map(({ question, answers }) => {
          return (
            <motion.div
              layout
              className="flex flex-col gap-4 border-t-2 border-stone-100 pt-6 first:border-0 first:pt-0"
            >
              <h3 className="font-semibold text-stone-600">{question}</h3>
              <div className="flex flex-wrap gap-2">
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
            </motion.div>
          );
        })}
      </motion.div>
      <div className="stop sticky bottom-0 flex w-full flex-col gap-4 bg-gradient-to-t from-stone-100 via-[#f5f5f4_66%] px-6 py-8">
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
