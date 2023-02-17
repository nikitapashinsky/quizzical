import { capitalize, toNumber } from "lodash";
import { LEVELS } from "./data";
import { CATEGORIES } from "./data";
import { motion } from "framer-motion";
import { forwardRef } from "react";

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
    const topicVariants = {
      initial: { boxShadow: "0 4px 0 #e7e5e4", translateY: 0 },
      hover: { boxShadow: "0 4px 0 #e7e5e4", translateY: -2 },
      active: { boxShadow: "0 1px 0 #e7e5e4", translateY: 4 },
    };
    return (
      <div
        ref={ref}
        className="flex flex-col items-center justify-center gap-12"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-black text-stone-800">Quizzical</h1>
          <h3 className="text-lg font-medium text-stone-500">
            Play stupid games, win stupid prizes!
          </h3>
        </div>
        <div className="flex w-full flex-col items-center gap-6">
          {/* <h2 className="font-semibold text-stone-500">Choose difficulty</h2> */}
          <ul className="flex w-full">
            {LEVELS.map((level, index) => (
              <li
                key={index}
                className="group/wrapper box-border w-full flex-1 grow 
              [&_input[type='radio']:checked_~_label_span]:-translate-y-[6px]
              [&_input[type='radio']:checked_~_label_span]:border-sky-500
              [&_input[type='radio']:checked_~_label_span]:bg-sky-50 
              [&_input[type='radio']:checked_~_label_span]:text-sky-600
              [&_input[type='radio']:checked_~_label_span]:first:border-r-2
              [&_input[type='radio']:checked_~_label_span]:hover:-translate-y-[6px]
              [&_input[type='radio']:checked_~_label]:bg-sky-500"
              >
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
                <label
                  htmlFor={level}
                  className={`group/label z-10 block select-none rounded-2xl bg-stone-200 transition group-first/wrapper:rounded-r-none group-last/wrapper:rounded-l-none group-even/wrapper:rounded-none`}
                >
                  <span className="block -translate-y-[6px] rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 text-center font-semibold text-stone-600 transition group-first/wrapper:rounded-r-none group-first/wrapper:border-r-0 group-last/wrapper:rounded-l-none group-even/wrapper:rounded-none group-hover/label:-translate-y-[8px] group-active/label:-translate-y-[2px] group-active/label:bg-stone-50">
                    {capitalize(level)}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-6">
          {/* <h2 className="font-semibold text-stone-500">Select a category</h2> */}
          <ul className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat, index) => (
              <li
                key={index}
                className="
              [&_input[type='radio']:checked_~_label_span]:-translate-y-[4px]
              [&_input[type='radio']:checked_~_label_span]:border-sky-500
              [&_input[type='radio']:checked_~_label_span]:bg-sky-50 
              [&_input[type='radio']:checked_~_label_span]:text-sky-600
              [&_input[type='radio']:checked_~_label_span]:hover:-translate-y-[4px]
              [&_input[type='radio']:checked_~_label]:bg-sky-500"
              >
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
                  htmlFor={cat.id}
                  className={`group block select-none rounded-xl bg-stone-200 transition`}
                >
                  <span className="block -translate-y-[4px] rounded-xl border-2 border-stone-200 bg-white px-4 py-2 text-center text-sm font-semibold text-stone-600 transition group-hover:-translate-y-[6px] group-active:-translate-y-[2px] group-active:bg-stone-50">
                    {cat.name}
                  </span>
                </motion.label>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleStartClick}
          className="group select-none rounded-2xl bg-sky-600"
        >
          <span className="block -translate-y-[6px] rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white transition will-change-transform group-hover:-translate-y-[8px] group-hover:brightness-110 group-active:-translate-y-[2px]">
            Start the game
          </span>
        </button>
      </div>
    );
  }
);

const MotionStart = motion(Start);

export default MotionStart;
