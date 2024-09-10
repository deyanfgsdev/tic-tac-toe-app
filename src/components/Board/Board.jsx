import { useState } from "react";

import "./Board.scss";

import initialPlayersData from "../../data/initialPlayersData";
import winnerCombinationsData from "../../data/winnerCombinationsData";

import Square from "../Square/Square";
import Score from "../Score/Score";
import Player from "../Player/Player";
import WinnerModal from "../WinnerModal/WinnerModal";
import EditPlayerNameModal from "../EditPlayerNameModal/EditPlayerNameModal";

const Board = () => {
  const [dataX, dataO] = initialPlayersData;

  const [board, setBoard] = useState(Array(9).fill(null)); // Initial null values
  const [turn, setTurn] = useState(dataX.imgSrc); // X
  const [playerNames, setPlayerNames] = useState([dataX.name, dataO.name]);
  const [scores, setScores] = useState([0, 0]);
  const [winner, setWinner] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

      // Update the score
      const newScores = [...scores];
      const winnerIndex = newWinner === dataX.imgSrc ? 0 : 1;
      newScores[winnerIndex] = newScores[winnerIndex] + 1;

      setScores(newScores);
    } else {
      // Check if it is a tie
      const isTie = newBoard.every((square) => square !== null);

      if (isTie) {
        setWinner(false);
      }
    }
  };

  const playAgain = () => {
    setBoard(Array(9).fill(null));
    setTurn(dataX.imgSrc);
    setWinner(null);
  };

  const checkShowEditModal = (newImgSrc, showModal) => {
    const newShowEditModal = showModal ? true : false;

    if (newShowEditModal) {
      setTurn(newImgSrc);
    }

    setShowEditModal(newShowEditModal);
  };

  const updatePlayerName = (playerImg, newName) => {
    const newPlayerNames = [...playerNames];
    const playerIndex = playerImg === dataX.imgSrc ? 0 : 1;

    newPlayerNames[playerIndex] = newName;
    setPlayerNames(newPlayerNames);
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

      <Score scores={scores} />

      <div className="tic-tac-toe--players">
        {initialPlayersData.map((player) => {
          const { id, imgSrc, alt } = player;

          return (
            <Player
              key={id}
              name={playerNames[id - 1]}
              imgSrc={imgSrc}
              alt={alt}
              isYourTurn={turn === imgSrc}
              checkShowEditModal={checkShowEditModal}
            />
          );
        })}
      </div>

      <button className="tic-tac-toe--restart-game-button" onClick={playAgain}>
        Restart game
      </button>

      <WinnerModal winnerPlayer={winner} playAgain={playAgain} />

      {showEditModal && (
        <EditPlayerNameModal
          playerImg={turn}
          checkShowEditModal={checkShowEditModal}
          updatePlayerName={updatePlayerName}
        />
      )}
    </>
  );
};

export default Board;
