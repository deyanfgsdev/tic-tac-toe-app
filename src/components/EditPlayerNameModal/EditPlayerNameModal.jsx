import { useState } from "react";

import "./EditPlayerNameModal.scss";

import CloseIcon from "../../assets/icons/CloseIcon.svg";

const EditPlayerNameModal = ({ playerImg, checkShowEditModal }) => {
  const [name, setName] = useState("");

  const handleNameInput = (event) => {
    const { value } = event.target;

    setName(value);
  };

  const handleAcceptClick = () => {
    checkShowEditModal(false);
  };

  return (
    <div className="tic-tac-toe--edit-player-name-modal">
      <div className="tic-tac-toe--modal-body">
        <button className="tic-tac-toe--modal-close-button">
          <img src={CloseIcon} alt="close icon" />
        </button>
        <img
          src={playerImg}
          alt="Player"
          className="tic-tac-toe--modal-player-img"
        />
        <label className="tic-tac-toe--modal-label">Enter a name</label>
        <input
          type="text"
          className="tic-tac-toe--modal-text-input"
          value={name}
          onChange={handleNameInput}
        />
        <button
          className="tic-tac-toe--modal-accept-button"
          onClick={handleAcceptClick}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default EditPlayerNameModal;
