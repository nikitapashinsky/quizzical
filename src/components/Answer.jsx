import { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MotionIconResult from "./IconResult";

const Answer = forwardRef(
  ({ question, answer, selectedAnswerId, handleSelectAnswer }, ref) => {
    const correctAnswer = question.isAnswered && answer.isCorrect;
    const wrongAnswer =
      question.isAnswered && answer.isSelected && !answer.isCorrect;
    const otherAnswers = question.isAnswered && !answer.isSelected;

    const isSelected = selectedAnswerId === answer.id;

    return (
      <motion.li ref={ref} className="relative">
        <input
          type="radio"
          id={answer.id}
          name="answer"
          value={answer.id}
          checked={isSelected}
          disabled={question.isAnswered}
          onChange={(event) => {
            console.log(event.target.value);
            handleSelectAnswer(event.target.value);
          }}
          className="peer absolute z-0 select-none appearance-none opacity-0"
        />
        <motion.label
          layout
          variants={variants}
          initial="initial"
          whileHover={!question.isAnswered && "hover"}
          whileTap={!question.isAnswered && "pressed"}
          transition={spring}
          htmlFor={answer.id}
          className={`
        relative flex w-full transform-gpu cursor-pointer select-none items-center justify-center rounded-[20px] border-2 py-3 px-5 text-center font-semibold
        ${
          correctAnswer
            ? `z-20 cursor-default border-[#449933] bg-[#ECF0EA] text-[#449933] peer-checked:border-[#449933] peer-checked:text-[#449933]`
            : wrongAnswer
            ? ` peer-checked:[#CF5A33] z-20 cursor-default border-[#CF5A33] bg-[#F3EDEA] text-[#CF5A33] peer-checked:border-[#CF5A33]`
            : otherAnswers
            ? `cursor-default border-stone-200 bg-stone-50 text-stone-400`
            : `border-stone-200 bg-white text-stone-600 shadow-resting shadow-stone-900/[0.01] transition-colors hover:border-stone-300  peer-checked:z-20 peer-checked:border-cyan-700 peer-checked:text-cyan-800 peer-checked:shadow-active peer-checked:shadow-stone-900/[0.03] peer-focus-visible:border-stone-400`
        }
        `}
        >
          {correctAnswer && (
            <MotionIconResult
              layout
              classNames="absolute left-[16px] top-[16px]"
              result="correct"
              initial={{ x: -16, scale: 0.25 }}
              animate={{ x: 0, scale: 1 }}
              transition={spring}
            />
          )}
          {wrongAnswer && (
            <MotionIconResult
              layout
              classNames="absolute left-[16px] top-[16px]"
              result="wrong"
              initial={{ x: -16, scale: 0.25 }}
              animate={{ x: 0, scale: 1 }}
              transition={spring}
            />
          )}
          <motion.span layout transition={spring} className="relative">
            {answer.answer}
          </motion.span>
        </motion.label>
      </motion.li>
    );
  }
);

export const MotionAnswer = motion(Answer);

const variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.025,
  },
  pressed: {
    scale: 0.95,
  },
};

const spring = {
  type: "spring",
  damping: 23,
  stiffness: 300,
};
