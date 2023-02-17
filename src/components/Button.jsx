export default function Button({ children, handleClick, disabled, variant }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={() => handleClick()}
      className={`
      flex min-h-[52px] w-full items-center justify-center rounded-[20px] py-3 font-semibold
        ${
          variant === "primary"
            ? "bg-cyan-800  text-cyan-50 hover:bg-cyan-900 active:bg-cyan-900"
            : variant === "secondary"
            ? "bg-stone-200 text-stone-800 hover:bg-stone-300 active:bg-stone-300"
            : ""
        }
        ${disabled && "cursor-not-allowed opacity-40"}
      `}
    >
      <span className={variant === "primary" ? `drop-shadow-md` : ``}>
        {children}
      </span>
    </button>
  );
}
