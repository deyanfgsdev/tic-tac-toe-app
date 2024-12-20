import { Player } from '../../types/global';
import { Scores } from '../Score/Score.types';

type Cell = Player['imgSrc'] | null;
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type BoardState = [
  Board,
  (newBoard: Board | ((prevState: Board) => Board)) => void,
];
export type Turn = Player['imgSrc'];
export type TurnState = [Turn, (newTurn: Turn) => void];
export type PlayerNames = [string, string];
export type PlayerNamesState = [
  PlayerNames,
  (updater: (prevState: PlayerNames) => PlayerNames) => void,
];
export type ScoresState = [
  Scores,
  (newScores: Scores | ((prevState: Scores) => Scores)) => void,
];
export type Winner = null | Player['imgSrc'] | false;
export type WinnerState = [Winner, (newWinner: Winner) => void];
export type ShowEditModalState = [boolean, (newShowEditModal: boolean) => void];
