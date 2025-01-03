import { Board } from '../components/Board/Board.types';
import { Player } from '../types/global';
import { Scores } from '../components/Score/Score.types';

export const storageSaveGame = ({
  board,
  turn,
  scores,
}: {
  board: Board;
  turn: Player['imgSrc'];
  scores: Scores | null;
}) => {
  window.localStorage.setItem('tic-tac-toe--board', JSON.stringify(board));
  window.localStorage.setItem('tic-tac-toe--turn', JSON.stringify(turn));

  if (scores) {
    window.localStorage.setItem('tic-tac-toe--scores', JSON.stringify(scores));
  }
};

export const storagePlayAgain = () => {
  window.localStorage.removeItem('tic-tac-toe--board');
};

export const storageRestartGame = () => {
  window.localStorage.removeItem('tic-tac-toe--board');
  window.localStorage.removeItem('tic-tac-toe--turn');
  window.localStorage.removeItem('tic-tac-toe--scores');
};
