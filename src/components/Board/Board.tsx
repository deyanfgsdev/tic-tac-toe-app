import { useState } from 'react';

import confetti from 'canvas-confetti';

import './Board.scss';

import { Player as GlobalPlayer } from '../../types/global';
import type {
  Board,
  BoardState,
  Turn,
  TurnState,
  PlayerNames,
  PlayerNamesState,
  Scores,
  ScoresState,
  Winner,
  WinnerState,
  ShowEditModalState,
} from './Board.types';

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

  const [playerNames, setPlayerNames]: PlayerNamesState = useState<PlayerNames>(
    () => {
      const storagePlayerNamesItem = window.localStorage.getItem(
        'tic-tac-toe--player-names'
      );
      const storagePlayerNames: PlayerNames | null = storagePlayerNamesItem
        ? JSON.parse(storagePlayerNamesItem)
        : null;

      if (storagePlayerNames) {
        return storagePlayerNames;
      }

      return [dataX.name, dataO.name];
    }
  );

  const [scores, setScores]: ScoresState = useState<Scores>(() => {
    const storageScoresItem = window.localStorage.getItem(
      'tic-tac-toe--scores'
    );
    const storageScores: Scores | null = storageScoresItem
      ? JSON.parse(storageScoresItem)
      : null;

    if (storageScores) {
      return storageScores;
    }

    return [0, 0];
  });

  const [winner, setWinner]: WinnerState = useState<Winner>(null);
  const [showEditModal, setShowEditModal]: ShowEditModalState =
    useState<boolean>(false);

  const checkWinnerPlayer = (newBoard: Board) => {
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

  const updateBoard = (index: number) => {
    // If the square is already filled or there is a winner
    if (board[index] || winner) {
      return;
    }

    // Update with the new board
    const newBoard: Board = [...board];
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
      const newScores: Scores = [...scores];
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

  const checkShowEditModal = (
    newImgSrc: GlobalPlayer['imgSrc'],
    showModal: boolean
  ) => {
    const newShowEditModal = !!showModal;

    if (newShowEditModal) {
      setTurn(newImgSrc);
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    setShowEditModal(newShowEditModal);
  };

  const updatePlayerName = (
    playerImg: GlobalPlayer['imgSrc'],
    newName: string
  ) => {
    const newPlayerNames: PlayerNames = [...playerNames];
    const playerIndex = playerImg === dataX.imgSrc ? 0 : 1;

    newPlayerNames[playerIndex] = newName;
    setPlayerNames(newPlayerNames);
    window.localStorage.setItem(
      'tic-tac-toe--player-names',
      JSON.stringify(newPlayerNames)
    );
  };

  const playAgain = (newWinner: Winner) => {
    storagePlayAgain();

    const newBoard = Array(9).fill(null) as Board;
    setBoard(newBoard);

    if (newWinner) {
      setTurn(newWinner);
    } else {
      setTurn(dataX.imgSrc);
    }

    setWinner(null);
  };

  const handleRestartGameClick = () => {
    storageRestartGame();

    const newBoard = Array(9).fill(null) as Board;
    setBoard(newBoard);

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
