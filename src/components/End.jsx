import { motion } from "framer-motion";
import { forwardRef } from "react";

const End = forwardRef(({ score, handleEndClick }, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-12">
      <h1 className="max-w-xs text-center text-2xl font-bold text-stone-800">
        You answered correctly {score}&nbsp;out of 6 questions!
      </h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleEndClick("game")}
          className="flex items-center justify-center self-center rounded-full bg-sky-400 px-6 py-3  font-semibold text-white hover:bg-sky-500 active:bg-sky-500"
        >
          Play again
        </button>
        <button
          onClick={() => handleEndClick("start")}
          className="flex items-center justify-center self-center rounded-full bg-stone-200 px-6 py-3  font-semibold text-stone-800 hover:bg-stone-300 active:bg-stone-300"
        >
          Return to menu
        </button>
      </div>
    </div>
  );
});

const MotionEnd = motion(End);
export default MotionEnd;
