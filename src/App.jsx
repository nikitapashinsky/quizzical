import Game from "./components/Game";
import "@fontsource/work-sans/variable.css";
import "@fontsource/source-serif-pro/700.css";
import "@fontsource/fraunces/variable-full.css";

function App() {
  const minHeight = window.innerHeight;
  return (
    <div
      style={{ minHeight: minHeight + "px" }}
      className="mx-auto flex w-full max-w-[428px] flex-col justify-center p-6"
    >
      <Game />
    </div>
  );
}

export default App;
