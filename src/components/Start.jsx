import { capitalize, toNumber } from "lodash";
import { LEVELS } from "./data";
import { CATEGORIES } from "./data";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Button } from "./Button";

const Start = forwardRef(
  (
    {
      categoryId,
      handleSelectCategory,
      difficultyLevel,
      handleSelectDifficulty,
      handleStartClick,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="flex flex-col items-center justify-center gap-12"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="logo font-serif text-6xl font-extrabold text-stone-800">
            Quizzical
          </h1>
          <h2 className="text-lg font-medium text-stone-500">
            Play stupid games, win stupid prizes!
          </h2>
        </div>
        <div className="flex w-full flex-col items-center gap-6">
          <ul className="flex w-full gap-2">
            {LEVELS.map((level, index) => (
              <li key={index} className="group flex w-full">
                <input
                  type="radio"
                  id={level}
                  name="difficulty"
                  value={level}
                  checked={difficultyLevel === level}
                  onChange={(event) => {
                    handleSelectDifficulty(event.target.value);
                  }}
                  className="peer absolute z-0 appearance-none opacity-0"
                />
                <motion.label
                  variants={variants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="pressed"
                  transition={spring}
                  htmlFor={level}
                  className={`relative flex
        w-full transform-gpu cursor-pointer select-none items-center justify-center rounded-[20px] border-2 border-stone-200 bg-white py-2 px-4 text-center text-sm font-semibold text-stone-600 shadow-resting shadow-stone-900/[0.01] 
        transition-colors will-change-transform hover:border-stone-300  group-first:rounded-r-lg group-first:pr-3 group-last:rounded-l-lg group-last:pl-3 group-even:rounded-lg group-hover:z-20 peer-checked:z-30 peer-checked:border-cyan-700 peer-checked:text-cyan-800
        peer-checked:shadow-active peer-checked:shadow-stone-900/[0.03] peer-focus-visible:border-stone-400
        `}
                >
                  {capitalize(level)}
                </motion.label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-6">
          <ul className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat, index) => (
              <li key={index} className="">
                <input
                  type="radio"
                  id={cat.id}
                  name="category"
                  value={cat.id}
                  checked={cat.id === categoryId}
                  onChange={(event) => {
                    handleSelectCategory(toNumber(event.target.value));
                  }}
                  className="radio group peer absolute z-0 appearance-none opacity-0"
                />
                <motion.label
                  variants={variants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="pressed"
                  transition={spring}
                  htmlFor={cat.id}
                  className={`
        relative flex w-full transform-gpu cursor-pointer select-none items-center justify-center rounded-[20px] border-2 border-stone-200 bg-white py-2 px-4 text-center
text-sm font-semibold text-stone-600 shadow-resting shadow-stone-900/[0.01] transition-colors will-change-transform hover:border-stone-300  peer-checked:z-20 peer-checked:border-cyan-700 peer-checked:text-cyan-800 peer-checked:shadow-active peer-checked:shadow-stone-900/[0.03] peer-focus-visible:border-stone-400
        `}
                >
                  {cat.name}
                </motion.label>
              </li>
            ))}
          </ul>
        </div>
        <Button variant="primary" handleClick={handleStartClick}>
          Start the game
        </Button>
      </div>
    );
  }
);

const MotionStart = motion(Start);

export default MotionStart;

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
  damping: 15,
  stiffness: 300,
};
