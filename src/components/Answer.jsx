export default function Answer({
  question,
  answer,
  selectedAnswerId,
  handleSelectAnswer,
}) {
  return (
    <li>
      <input
        type="radio"
        id={answer.id}
        name="answer"
        value={answer.id}
        checked={selectedAnswerId === answer.id}
        disabled={question.isAnswered}
        onChange={(event) => {
          console.log(event.target.value);
          handleSelectAnswer(event.target.value);
        }}
        className="peer absolute z-0 appearance-none opacity-0"
      />
      <label
        htmlFor={answer.id}
        className={`
        relative z-10 flex w-full cursor-pointer items-center justify-center rounded-[36px] border-2 py-3 px-7  text-center font-semibold 
        ${
          question.isAnswered && answer.isCorrect
            ? `cursor-default border-green-600 bg-white text-green-600 hover:border-green-600 peer-checked:border-green-600 peer-checked:text-green-600`
            : question.isAnswered & !answer.isCorrect && answer.isSelected
            ? `cursor-default border-red-600 bg-white text-red-600 peer-checked:border-red-600 peer-checked:text-red-600`
            : question.isAnswered && !answer.isSelected
            ? `cursor-default border-stone-200 bg-white text-stone-400`
            : `border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-white active:border-stone-300 active:bg-white peer-checked:border-sky-500 peer-checked:bg-white peer-checked:text-sky-600 peer-focus-visible:border-sky-500`
        }
        `}
      >
        {answer.answer}
      </label>
    </li>
  );
}
