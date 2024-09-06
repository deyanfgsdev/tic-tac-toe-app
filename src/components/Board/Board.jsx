import { useState } from "react";

import "./Board.scss";

import initialPlayersData from "../../data/initialPlayersData";
import winnerCombinationsData from "../../data/winnerCombinationsData";

import Square from "../Square/Square";
import Player from "../Player/Player";
import WinnerModal from "../WinnerModal/WinnerModal";

const Board = () => {
  const [dataX, dataO] = initialPlayersData;

  const [board, setBoard] = useState(Array(9).fill(null)); // Initial null values
  const [turn, setTurn] = useState(dataX.imgSrc); // X
  const [winner, setWinner] = useState(null);

  const checkWinnerPlayer = (newBoard) => {
    for (const combination of winnerCombinationsData) {
      const [a, b, c] = combination;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a]; // Return the winner player
      }
    }

    return null; // No winner
  };

  const updateBoard = (index) => {
    // If the square is already filled or there is a winner
    if (board[index] || winner) {
      return;
    }

    // Update with the new board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Update the turn
    const newTurn = turn === dataX.imgSrc ? dataO.imgSrc : dataX.imgSrc;
    setTurn(newTurn);

    // Check if there is a winner
    const newWinner = checkWinnerPlayer(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else {
      // Check if it is a tie
      const isTie = newBoard.every((square) => square !== null);

      if (isTie) {
        setWinner(false);
      }
    }
  };

  return (
    <>
      <div className="tic-tac-toe--board">
        {board.map((squareImg, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {squareImg}
            </Square>
          );
        })}
      </div>

      <div className="tic-tac-toe--players">
        {initialPlayersData.map((player) => {
          const { id, name, imgSrc, alt } = player;

          return (
            <Player
              key={id}
              initialName={name}
              imgSrc={imgSrc}
              alt={alt}
              isYourTurn={turn === imgSrc}
            />
          );
        })}
      </div>

      <WinnerModal winnerPlayer={winner} />
    </>
  );
};

export default Board;
