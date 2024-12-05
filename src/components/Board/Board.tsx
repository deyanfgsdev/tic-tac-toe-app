import { useState } from 'react';

import confetti from 'canvas-confetti';

import './Board.scss';

import type { Board, BoardState, Turn, TurnState } from './Board.types';

import initialPlayersData from '../../data/initialPlayersData';
import winnerCombinationsData from '../../data/winnerCombinationsData';
import {
  storageSaveGame,
  storagePlayAgain,
  storageRestartGame,
} from '../../storage';

import Square from '../Square/Square';
import Score from '../Score/Score';
import Player from '../Player/Player';
import WinnerModal from '../WinnerModal/WinnerModal';
import EditPlayerNameModal from '../EditPlayerNameModal/EditPlayerNameModal';

const Board = () => {
  const [dataX, dataO] = initialPlayersData;

  const [board, setBoard]: BoardState = useState<Board>(() => {
    const storageBoardItem = window.localStorage.getItem('tic-tac-toe--board');
    const storageBoard: Board | null = storageBoardItem
      ? JSON.parse(storageBoardItem)
      : null;

    if (storageBoard) {
      return storageBoard;
    }

    return Array(9).fill(null) as Board;
  });

  const [turn, setTurn]: TurnState = useState<Turn>(() => {
    const storageTurnItem = window.localStorage.getItem('tic-tac-toe--turn');
    const storageTurn: Turn | null = storageTurnItem
      ? JSON.parse(storageTurnItem)
      : null;

    if (storageTurn) {
      return storageTurn;
    }

    return dataX.imgSrc;
  });

  const [playerNames, setPlayerNames] = useState(() => {
    const storagePlayerNames = JSON.parse(
      window.localStorage.getItem('tic-tac-toe--player-names')
    );

    if (storagePlayerNames) {
      return storagePlayerNames;
    }

    return [dataX.name, dataO.name];
  });
  const [scores, setScores] = useState(() => {
    const storageScores = JSON.parse(
      window.localStorage.getItem('tic-tac-toe--scores')
    );

    if (storageScores) {
      return storageScores;
    }

    return [0, 0];
  });
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

    // Save the game
    storageSaveGame({
      board: newBoard,
      turn: newTurn,
      scores: null,
    });

    // Check if there is a winner
    const newWinner = checkWinnerPlayer(newBoard);

    if (newWinner) {
      setWinner(newWinner);

      confetti();

      // Update the score
      const newScores = [...scores];
      const winnerIndex = newWinner === dataX.imgSrc ? 0 : 1;
      newScores[winnerIndex] = newScores[winnerIndex] + 1;
      setScores(newScores);

      // Save the game with the scores
      storageSaveGame({
        board: newBoard,
        turn: newWinner,
        scores: newScores,
      });
    } else {
      // Check if it is a tie
      const isTie = newBoard.every((square) => square !== null);

      if (isTie) {
        setWinner(false);
      }
    }
  };

  const checkShowEditModal = (newImgSrc, showModal) => {
    const newShowEditModal = !!showModal;

    if (newShowEditModal) {
      setTurn(newImgSrc);
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    setShowEditModal(newShowEditModal);
  };

  const updatePlayerName = (playerImg, newName) => {
    const newPlayerNames = [...playerNames];
    const playerIndex = playerImg === dataX.imgSrc ? 0 : 1;

    newPlayerNames[playerIndex] = newName;
    setPlayerNames(newPlayerNames);
    window.localStorage.setItem(
      'tic-tac-toe--player-names',
      JSON.stringify(newPlayerNames)
    );
  };

  const playAgain = (newWinner) => {
    storagePlayAgain();
    setBoard(Array(9).fill(null));

    if (newWinner) {
      setTurn(newWinner);
    } else {
      setTurn(dataX.imgSrc);
    }

    setWinner(null);
  };

  const handleRestartGameClick = () => {
    storageRestartGame();
    setBoard(Array(9).fill(null));
    setTurn(dataX.imgSrc);
    setScores([0, 0]);
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

      <button
        className="tic-tac-toe--restart-game-button"
        onClick={handleRestartGameClick}
      >
        Restart game
      </button>

      <WinnerModal winnerPlayer={winner} playAgain={() => playAgain(winner)} />

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
