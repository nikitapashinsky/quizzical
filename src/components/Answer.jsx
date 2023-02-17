import { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MotionIconResult from "./IconResult";

const Answer = forwardRef(
  ({ question, answer, selectedAnswerId, handleSelectAnswer }, ref) => {
    return (
      <li ref={ref}>
        <input
          type="radio"
          id={answer.id}
          name="answer"
          value={answer.id}
          checked={selectedAnswerId === answer.id}
          disabled={question.isAnswered}
          onChange={(event) => {
            console.log(event.target.value);
            handleSelectAnswer(event.target.value);
          }}
          className="peer absolute z-0 appearance-none opacity-0"
        />
        <motion.label
          layout
          htmlFor={answer.id}
          className={`
        relative flex w-full cursor-pointer items-start gap-3 rounded-[20px] border-2 bg-clip-padding py-3 px-5 font-semibold
        ${
          question.isAnswered && answer.isCorrect
            ? `z-20 cursor-default border-[#449933] bg-[#ECF0EA] pl-4 text-[#449933] shadow-active shadow-[#1A3913]/[0.05] hover:border-green-600 peer-checked:border-[#449933] peer-checked:text-[#449933]`
            : question.isAnswered & !answer.isCorrect && answer.isSelected
            ? ` peer-checked:[#CF5A33] z-20 cursor-default border-[#CF5A33] bg-[#F3EDEA] pl-4 text-[#CF5A33] shadow-active shadow-[#391D13]/[0.05] peer-checked:border-[#CF5A33]`
            : question.isAnswered && !answer.isSelected
            ? `cursor-default border-stone-200 bg-stone-50 text-stone-400`
            : `border-stone-200 bg-white text-stone-600 shadow-resting shadow-stone-900/[0.01] transition hover:border-stone-300 peer-checked:z-20 peer-checked:border-cyan-700 peer-checked:text-cyan-800 peer-checked:shadow-active peer-checked:shadow-stone-900/[0.02] peer-focus-visible:border-stone-400`
        }
        `}
        >
          {question.isAnswered && answer.isCorrect && (
            <MotionIconResult
              layout
              result="correct"
              initial={{ scale: 0.5, y: 4 }}
              animate={{ scale: 1, y: 4 }}
            />
          )}
          {question.isAnswered && !answer.isCorrect && answer.isSelected && (
            <MotionIconResult
              layout
              result="wrong"
              initial={{ scale: 0.5, y: 4 }}
              animate={{ scale: 1, y: 4 }}
            />
          )}
          <motion.span layout>{answer.answer}</motion.span>
        </motion.label>
      </li>
    );
  }
);

const MotionAnswer = motion(Answer);

export default MotionAnswer;
