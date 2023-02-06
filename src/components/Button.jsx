export default function Button({ children, handleClick, selectedAnswerId }) {
  return (
    <button
      onClick={() => handleClick(selectedAnswerId)}
      className="flex h-14 items-center justify-center rounded-[20px] border-[3px] border-gray-900 bg-lime-200 py-4 px-5 text-lg font-medium shadow-[0_3px_0_#111827] transition-all hover:-translate-y-[2px] hover:shadow-[0_5px_0_#111827] active:translate-y-[2px] active:shadow-[0_1px_0_#111827] dark:border-zinc-800 dark:bg-violet-400 dark:text-slate-900 dark:shadow-[0_3px_0_#27272a,inset_0_3px_0_#c4b5fd] dark:hover:shadow-[0_5px_0_#27272a] dark:active:shadow-[0_1px_0_#27272a]"
    >
      {children}
    </button>
  );
}
