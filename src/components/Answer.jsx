import he from "he";
import { useState } from "react";

export default function Answer({
  answer,
  selectedAnswerId,
  handleSelectAnswer,
}) {
  return (
    <li className="">
      <input
        type="radio"
        id={answer.id}
        name="answer"
        value={answer.id}
        checked={selectedAnswerId === answer.id}
        onChange={(event) => {
          handleSelectAnswer(event.target.value);
        }}
        className="peer hidden"
      />
      <label
        htmlFor={answer.id}
        className="flex h-14 cursor-pointer items-center rounded-[16px] border-[3px] border-gray-900 bg-white px-5 font-medium shadow-[0_3px_0_#111827] transition-all hover:-translate-y-[2px] hover:bg-lime-50 hover:shadow-[0_5px_0_#111827] active:translate-y-[2px] active:shadow-[0_1px_0_#111827] dark:border-zinc-800 dark:bg-zinc-600 dark:text-gray-50 dark:shadow-[0_3px_0_#27272a,inset_0_3px_0_#71717a] dark:hover:bg-zinc-500 dark:hover:shadow-[0_5px_0_#27272a,inset_0_3px_0_#a1a1aa] dark:active:bg-zinc-600 dark:active:shadow-[0_1px_0_#27272a] dark:peer-checked:bg-violet-400 dark:peer-checked:text-slate-900 dark:peer-checked:shadow-[0_3px_0_rgb(196,181,253,0.4),inset_0_4px_0_rgba(76,29,149,0.45)]"
      >
        {he.unescape(answer.answer)}
      </label>
    </li>
  );
}
