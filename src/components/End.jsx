import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Button } from "./Button";

const End = forwardRef(({ score, handleEndClick }, ref) => {
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
