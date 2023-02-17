export default function Button({ children, handleClick, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={() => handleClick()}
      className={`flex min-h-[52px] w-full items-center justify-center self-center rounded-[20px] bg-cyan-800 py-3 font-semibold text-cyan-50 hover:bg-cyan-900 active:bg-cyan-900 ${
        disabled ? `cursor-not-allowed opacity-40` : ""
      }`}
    >
      <span className="drop-shadow-md">{children}</span>
    </button>
  );
}
