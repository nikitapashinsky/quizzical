import { motion } from "framer-motion";
import MotionAnswer from "./Answer";
import Button from "./Button";
import { AnimatePresence } from "framer-motion";
import { forwardRef, useEffect } from "react";

const Question = forwardRef(
  (
    {
      question,
      currentQuestionIndex,
      selectedAnswerId,
      handleSelectAnswer,
      handleCheckAnswer,
      handleNextQuestion,
    },
    ref
  ) => {
    let buttonLabel;
    if (!question.isAnswered) {
      buttonLabel = "Check answer";
    } else if (question.isAnswered && currentQuestionIndex < 5) {
      buttonLabel = "Next question";
    } else if (question.isAnswered && currentQuestionIndex === 5) {
      buttonLabel = "Finish game";
    }

    const answerListVariants = {
      initial: {},
      final: {
        transition: {
          delayChildren: 0.15,
          staggerChildren: 0.05,
        },
      },
      exit: {},
    };

    const answerVariants = {
      initial: {
        opacity: 0,
        x: 320,
      },
      final: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", duration: 0.75, bounce: 0.18 },
      },
      exit: {
        opacity: 0,
        x: -320,
        transition: { type: "spring", duration: 0.75, bounce: 0.18 },
      },
    };

    const questionVariants = {
      initial: {
        x: 500,
      },
      animate: {
        x: 0,
        transition: { type: "spring", duration: 0.75, bounce: 0.18 },
      },
      exit: {
        x: -500,
        transition: { type: "spring", duration: 0.75, bounce: 0 },
      },
    };

    return (
      <motion.div
        ref={ref}
        className="flex w-full flex-1 flex-col items-center justify-center gap-6"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentQuestionIndex}
            variants={questionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex max-h-[380px] w-full flex-1 items-center justify-center rounded-[20px] border-2 border-stone-200 bg-white p-8 text-center shadow-resting shadow-stone-900/[0.01]"
          >
            <h1 className="max-w-xs font-serif text-3xl font-bold leading-10 text-stone-800 ">
              {question.question}
            </h1>
          </motion.div>
        </AnimatePresence>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex w-full flex-col justify-center gap-8"
        >
          <AnimatePresence mode="popLayout">
            <motion.ul
              key={currentQuestionIndex}
              variants={answerListVariants}
              initial="initial"
              animate="final"
              exit="exit"
              className="flex w-full flex-col justify-center gap-3"
            >
              {question.answers.map((answer, index) => {
                return (
                  <MotionAnswer
                    question={question}
                    key={index}
                    variants={answerVariants}
                    answer={answer}
                    selectedAnswerId={selectedAnswerId}
                    handleSelectAnswer={handleSelectAnswer}
                  />
                );
              })}
            </motion.ul>
          </AnimatePresence>
          <Button
            variant="primary"
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
      </motion.div>
    );
  }
);

const MotionQuestion = motion(Question);
export default MotionQuestion;
