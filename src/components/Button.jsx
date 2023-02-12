export default function Button({ children, handleClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={() => handleClick()}
      className={`flex w-full items-center justify-center self-center rounded-2xl bg-sky-400 px-10 py-3 font-semibold text-white hover:bg-sky-500 active:bg-sky-500 ${
        disabled
          ? `cursor-not-allowed bg-sky-200 hover:bg-sky-200 active:bg-sky-200`
          : ""
      }`}
    >
      <span className="drop-shadow-sm">{children}</span>
    </button>
  );
}
