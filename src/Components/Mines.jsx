import React, { useState } from "react";
import style from "./Mines.module.css";

function Mines({ gameState }) {
  const rows = 5;
  const cols = 5;
  const totalCells = rows * cols;

  const wrongMineSound = new Audio("/sounds/incorrect_buzzer.mp3"); 

  // State to keep track of clicked cells
  const [cellColors, setCellColors] = useState({});

  const getRandomNumbers = (min, max, count, exclude = []) => {
    const numbers = new Set(exclude);
    while (numbers.size < count+exclude.length) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.has(randomNum)) {
        numbers.add(randomNum);
      }
    }
    return Array.from(numbers);
  };
  const newCellColors = { ...cellColors };

  

  // Handle cell click
  const handleCellClick = (rowIndex, colIndex, gameState) => {
    const clickedIndex = rowIndex * cols + colIndex;

    // Initialize all cells to green
    for (let i = 0; i < totalCells; i++) {
        newCellColors[i] = style.green;
      }
    

    if (gameState === "Win") {
      
      const randomNumbers = getRandomNumbers(0, totalCells - 1, 3, [
        clickedIndex,
      ]);
      randomNumbers.forEach((index) => {
        newCellColors[index] = style.red;
      });
      newCellColors[clickedIndex] = style.green;
    //   setCellColors(newCellColors);
    } else if (gameState === "Lose") {
      // Play the wrong mine sound
      wrongMineSound.play();

      newCellColors[clickedIndex] = style.red;

      const randomNumbers = getRandomNumbers(0, totalCells - 1, 2, [
        clickedIndex,
      ]);
      randomNumbers.forEach((index) => {
        newCellColors[index] = style.red;
      });
    } else {
      const randomNumbers = getRandomNumbers(0, totalCells - 1, 3);
      randomNumbers.forEach((index) => {
        newCellColors[index] = style.red;
      });
      if(newCellColors[clickedIndex] === style.red){
        wrongMineSound.play();
      }
    }

    setCellColors(newCellColors);
  };

  return (
    <div className={style.container}>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className={style.row}>
          {Array.from({ length: cols }, (_, colIndex) => {
            // Calculate the index for the current cell
            const index = rowIndex * cols + colIndex;
            const cellClass = cellColors[index] || style.cell;
            return (
              <div
                key={index} // Use the index as the key for each cell
                className={cellClass}
                onClick={() => handleCellClick(rowIndex, colIndex, gameState)} // Attach click event handler
              >
                {/* Optional: Display the index */}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Mines;
