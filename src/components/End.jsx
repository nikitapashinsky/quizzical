import { motion } from "framer-motion";
import { forwardRef } from "react";
import Button from "./Button";

const End = forwardRef(({ score, handleEndClick }, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-12">
      <h1 className="max-w-xs text-center text-2xl font-bold text-stone-800">
        You answered correctly {score}&nbsp;out of 6 questions!
      </h1>
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
