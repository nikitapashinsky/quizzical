export default function Answer({
  question,
  answer,
  selectedAnswerId,
  handleSelectAnswer,
}) {
  const conditionalStyles = (answeredCorrectly) => {
    if (answeredCorrectly) {
      return `border-green-600 bg-green-500 text-[#fff] hover:border-green-600 hover:text-[#fff] peer-checked:border-green-600 peer-checked:text-[#fff] cursor-default`;
    } else if (question.isAnswered && !answer.isCorrect && answer.isSelected) {
      return `border-red-700 bg-red-500 text-[#fff] hover:text-[#fff] 
      peer-checked:border-red-700 peer-checked:text-[#fff] cursor-default`;
    } else if (question.isAnswered && !answer.isSelected) {
      return `bg-stone-100 text-stone-400 border-stone-200 cursor-default`;
    } else {
      return `border-stone-200 bg-white text-stone-800 hover:bg-stone-100 peer-checked:border-stone-900 peer-checked:text-stone-900 active:bg-stone-100 active:border-stone-300 peer-checked:bg-stone-100 peer-checked:border-stone-300`;
    }
  };

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
        className="peer hidden"
      />
      <label
        htmlFor={answer.id}
        className={`flex w-full cursor-pointer items-center justify-center rounded-[36px] border-2 py-3 px-7 text-center  font-semibold
        ${conditionalStyles(question.isAnswered && answer.isCorrect)}
        `}
      >
        {answer.answer}
      </label>
    </li>
  );
}
