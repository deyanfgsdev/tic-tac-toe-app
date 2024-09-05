import { useState } from "react";

import "./Player.scss";

const Player = ({ initialName, imgSrc, alt, isYourTurn }) => {
  const [name, setName] = useState(initialName);

  const className = isYourTurn
    ? "tic-tac-toe--img-container is-your-turn"
    : "tic-tac-toe--img-container";

  return (
    <div className="tic-tac-toe--player">
      <div className={className}>
        <img src={imgSrc} alt={alt} className="tic-tac-toe-player--img" />
      </div>
      <h2 className="tic-tac-toe-player--name">{name}</h2>
      <button className="tic-tac-toe-player--change-name-button">
        Change Name
      </button>
    </div>
  );
};

export default Player;
