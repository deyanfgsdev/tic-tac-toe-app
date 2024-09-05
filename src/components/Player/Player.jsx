import { useState } from "react";

import "./Player.scss";

const Player = ({ initialName, imgSrc, alt, isYourTurn }) => {
  const [name, setName] = useState(initialName);

  const classNameImg = isYourTurn
    ? "tic-tac-toe-player--img is-your-turn"
    : "tic-tac-toe-player--img";

  return (
    <div className="tic-tac-toe--player">
      <img src={imgSrc} alt={alt} className={classNameImg} />
      <h2 className="tic-tac-toe-player--name">{name}</h2>
      <button className="tic-tac-toe-player--change-name-button">
        Change Name
      </button>
    </div>
  );
};

export default Player;
