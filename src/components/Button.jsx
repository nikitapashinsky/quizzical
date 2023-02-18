import { motion } from "framer-motion";
import { forwardRef } from "react";

const ButtonRef = forwardRef(
  ({ children, handleClick, disabled, variant }, ref) => {
    return (
      <motion.button
        ref={ref}
        variants={variant === "primary" ? primaryVariants : secondaryVariants}
        initial="initial"
        whileHover="hover"
        whileTap="pressed"
        transition={spring}
        type="submit"
        disabled={disabled}
        onClick={() => handleClick()}
        className={`
      flex min-h-[52px] w-full select-none items-center justify-center rounded-[20px] py-3 font-semibold
        ${disabled && "cursor-not-allowed opacity-40"}
      `}
      >
        <span className={variant === "primary" ? `drop-shadow-md` : ``}>
          {children}
        </span>
      </motion.button>
    );
  }
);

export const Button = motion(ButtonRef);

const primaryVariants = {
  initial: {
    scale: 1,
    backgroundColor: "var(--cyan-800)",
    color: "var(--cyan-50)",
  },
  hover: {
    scale: 1.025,
    backgroundColor: "var(--cyan-900)",
  },
  pressed: {
    scale: 0.95,
    backgroundColor: "var(--cyan-900)",
  },
};

const secondaryVariants = {
  initial: {
    scale: 1,
    backgroundColor: "var(--stone-200)",
    color: "var(--stone-800)",
  },
  hover: {
    scale: 1.025,
    backgroundColor: "var(--stone-300)",
  },
  pressed: {
    scale: 0.95,
    backgroundColor: "var(--stone-300)",
  },
};

const spring = {
  type: "spring",
  damping: 15,
  stiffness: 300,
};
