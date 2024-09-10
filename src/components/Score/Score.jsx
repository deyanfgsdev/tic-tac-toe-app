import "./Score.scss";

const Score = ({ scores }) => {
  return (
    <div className="tic-tac-toe--score">
      <span className="tic-tac-toe--player-one">{scores[0]}</span>
      <span className="tic-tac-toe--colon">:</span>
      <span className="tic-tac-toe--player-two">{scores[1]}</span>
    </div>
  );
};

export default Score;
