import { Player } from '../../types/global';

type Cell = string | null;
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type BoardState = [Board, (newBoard: Board) => void];
export type Turn = Player['imgSrc'];
export type TurnState = [Turn, (newTurn: Turn) => void];
