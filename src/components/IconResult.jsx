import { motion } from "framer-motion";
import { forwardRef } from "react";

const IconResult = forwardRef(({ result, classNames }, ref) => {
  return (
    <motion.svg
      className={`${classNames}`}
      ref={ref}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {result === "correct" ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.7071 5.70711L11.2929 4.29289L6.5 9.08579L4.70711 7.29289L3.29289 8.70711L6.5 11.9142L12.7071 5.70711Z"
          fill="#449933"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4.29289 5.70711L6.58579 8L4.29289 10.2929L5.70711 11.7071L8 9.41421L10.2929 11.7071L11.7071 10.2929L9.41421 8L11.7071 5.70711L10.2929 4.29289L8 6.58579L5.70711 4.29289L4.29289 5.70711Z"
          fill="#CF5A33"
        />
      )}
    </motion.svg>
  );
});

const MotionIconResult = motion(IconResult);

export default MotionIconResult;
