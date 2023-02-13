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
      <h1 className="text-5xl font-black text-stone-800">Quizzical</h1>
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-semibold text-stone-500">Choose difficulty</h2>
        <ul className="flex gap-3">
          {LEVELS.map((level, index) => (
            <li key={index}>
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
                      relative z-10 flex w-full cursor-pointer items-center justify-center rounded-[36px] border-2 border-stone-200 bg-white  py-3 px-7
                       text-center font-semibold text-stone-800 hover:border-stone-300 hover:bg-white active:border-stone-300 active:bg-white peer-checked:border-sky-500 peer-checked:bg-white peer-checked:text-sky-600 peer-focus-visible:border-sky-500
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
