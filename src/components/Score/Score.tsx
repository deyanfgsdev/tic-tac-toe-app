import './Score.scss';

import { Scores } from './Score.types';

const Score = ({ scores }: { scores: Scores }) => {
  return (
    <div className="tic-tac-toe--score">
      <span className="tic-tac-toe--player-one">{scores[0]}</span>
      <span className="tic-tac-toe--colon">:</span>
      <span className="tic-tac-toe--player-two">{scores[1]}</span>
    </div>
  );
};

export default Score;
