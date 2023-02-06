import Game from "./components/Game";
import "@fontsource/space-grotesk/variable.css";

function App() {
  return (
    <div className="mx-auto flex h-screen max-w-md flex-col items-center justify-center gap-4 p-12 text-center">
      <Game />
    </div>
  );
}

export default App;
