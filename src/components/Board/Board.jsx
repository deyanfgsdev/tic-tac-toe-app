import { useState } from "react";

import "./Board.scss";

import initialPlayersData from "../../data/initialPlayersData";

import Square from "../Square/Square";
import Player from "../Player/Player";

const Board = () => {
  const [dataX, dataO] = initialPlayersData;

  const [board, setBoard] = useState(Array(9).fill(null)); // Initial null values
  const [turn, setTurn] = useState(dataX.imgSrc); // X

  const updateBoard = (index) => {
    // If the square is already filled
    if (board[index]) {
      return;
    }

    // Update with the new board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Update the turn
    const newTurn = turn === dataX.imgSrc ? dataO.imgSrc : dataX.imgSrc;
    setTurn(newTurn);
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
    </>
  );
};

export default Board;
