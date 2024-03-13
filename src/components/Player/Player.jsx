import "./Player.scss";

import { useState } from "react";

const Player = ({
  playerId,
  initialPlayerName,
  initialCurrentTurn,
  initialIsWinner,
  imgSrc,
  alt,
}) => {
  const [name, setName] = useState(initialPlayerName);
  const [isYourTurn, setIsYourTurn] = useState(initialCurrentTurn);
  const [isWinner, setIsWinner] = useState(initialIsWinner);

  return (
    <div
      className={`tic-tac-toe-player-container ${
        playerId === 1 ? "tic-tac-toe-player-1" : "tic-tac-toe-player-2"
      }`}
    >
      <img
        src={imgSrc}
        alt={alt}
        className={`tic-tac-toe-player-img ${
          playerId === 1 ? "player-1-img" : "player-2-img"
        }`}
      />
      <h2 className="tic-tac-toe-player-name">{name}</h2>
      <button className="tic-tac-toe-player-change-name-button">
        Change Name
      </button>
    </div>
  );
};

export default Player;
