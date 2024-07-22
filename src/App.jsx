import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Mines from "./Components/Mines";

function App() {
  const [gameState, setGameState] = useState(null);

  const handleButtonClicks = (state) => {
    setGameState(state);
  };

  return (
    <>
      <div>
        {gameState === null ? (
          <div className="buttons">
            <button onClick={() => handleButtonClicks("Win")}>Win</button>
            <button onClick={() => handleButtonClicks("Lose")}>Lose</button>
            <button onClick={() => handleButtonClicks("Random")}>Random</button>
          </div>
        ) : (
          <Mines gameState={gameState} />
        )}
      </div>
    </>
  );
}

export default App;
