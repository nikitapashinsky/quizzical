import { LayoutGroup, motion } from "framer-motion";
import { MotionAnswer } from "./Answer";
import { Button } from "./Button";
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

    return (
      <motion.div
        layout
        ref={ref}
        className="flex w-full flex-1 flex-col items-center gap-6"
      >
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              key={currentQuestionIndex}
              variants={questionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex max-h-[380px] w-full flex-1 items-center justify-center rounded-[20px] text-center"
            >
              <h1 className="font-serif text-3xl font-bold leading-10 text-stone-800">
                {question.question}
              </h1>
            </motion.div>
          </AnimatePresence>
          <motion.form
            layout
            onSubmit={(event) => event.preventDefault()}
            className="flex w-full flex-col justify-center gap-8"
          >
            <AnimatePresence mode="popLayout">
              <motion.ul
                layout
                key={currentQuestionIndex}
                variants={answerListVariants}
                initial="initial"
                animate="final"
                exit="exit"
                className="flex w-full flex-col gap-3"
              >
                {question.answers.map((answer, index) => {
                  return (
                    <MotionAnswer
                      layout
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
              initial={{ y: 96 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 23 }}
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
          </motion.form>
        </LayoutGroup>
      </motion.div>
    );
  }
);

export const MotionQuestion = motion(Question);

const spring = {
  type: "spring",
  damping: 15,
  stiffness: 300,
};

const answerListVariants = {
  initial: {},
  final: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.05,
    },
  },
  exit: {},
};

const answerVariants = {
  initial: {
    opacity: 0,
    x: 500,
  },
  final: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 23,
    },
  },
  exit: {
    opacity: 0,
    x: -500,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 23,
    },
  },
};

const questionVariants = {
  initial: {
    x: 500,
  },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 23,
    },
  },
  exit: {
    x: -500,
    transition: { type: "spring", duration: 0.5, bounce: 0 },
  },
};
