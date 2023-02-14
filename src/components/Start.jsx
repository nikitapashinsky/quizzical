import { capitalize, toNumber } from "lodash";
import { LEVELS } from "./data";
import { CATEGORIES } from "./data";

export default function Start({
  categoryId,
  handleSelectCategory,
  difficultyLevel,
  handleSelectDifficulty,
  handleStartClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-5xl font-black text-stone-800">Quizzical</h1>
        <h3 className="text-lg font-medium text-stone-500">
          Play stupid games, win stupid prizes!
        </h3>
      </div>
      <div className="flex w-full flex-col items-center gap-6">
        <h2 className="font-semibold text-stone-500">Choose difficulty</h2>
        <ul className="flex w-full">
          {LEVELS.map((level, index) => (
            <li key={index} className="group box-border w-full flex-1 grow">
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
                className={`
                      relative z-10 flex w-full cursor-pointer items-center justify-center rounded-[36px] border-2 border-stone-200 bg-white py-3 px-7
                       text-center font-semibold text-stone-800 hover:border-stone-300 hover:bg-white active:border-stone-300 active:bg-white 
                       group-first:rounded-r-none group-first:border-r-0 group-first:pr-6
                       group-first:hover:shadow-[2px_0_0_#d6d3d1] group-last:rounded-l-none 
                       group-last:border-l-0 group-last:pl-6 group-last:hover:shadow-[-2px_0_0_#d6d3d1]
                       group-even:rounded-none 
                       peer-checked:z-30 peer-checked:border-sky-500 peer-checked:bg-white 
                       peer-checked:text-sky-600 group-first:peer-checked:shadow-[2px_0_0_#0ea5e9]
                       group-last:peer-checked:shadow-[-2px_0_0_#0ea5e9] 
                       peer-hover:z-20  peer-focus-visible:border-sky-500
                      `}
              >
                {capitalize(level)}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-semibold text-stone-500">Select a category</h2>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat, index) => (
            <li key={index}>
              <input
                type="radio"
                id={cat.id}
                name="category"
                value={cat.id}
                checked={cat.id === categoryId}
                onChange={(event) => {
                  handleSelectCategory(toNumber(event.target.value));
                }}
                className="peer absolute z-0 appearance-none opacity-0"
              />
              <label
                htmlFor={cat.id}
                className={`
                      relative z-10 flex w-full cursor-pointer items-center justify-center rounded-[36px] border-2 border-stone-200 bg-white  py-3 px-7
                       text-center font-semibold text-stone-800 hover:border-stone-300 hover:bg-white active:border-stone-300 active:bg-white peer-checked:border-sky-500 peer-checked:bg-white peer-checked:text-sky-600 peer-focus-visible:border-sky-500
                      `}
              >
                {cat.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleStartClick}
        className="flex items-center justify-center self-center rounded-full bg-sky-400 px-6 py-3 font-semibold text-white hover:bg-sky-500 active:bg-sky-500"
      >
        Start the game
      </button>
    </div>
  );
}
