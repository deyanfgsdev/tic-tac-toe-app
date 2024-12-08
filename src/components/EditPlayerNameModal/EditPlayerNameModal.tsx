import { useState } from 'react';

import './EditPlayerNameModal.scss';

import CloseIcon from '../../assets/icons/CloseIcon.svg';

import { Player } from '../../types/global';
import { Turn } from '../Board/Board.types';
import {
  InputNameState,
  ShowInputErrorMessageState,
} from './EditPlayerNameModal.types';

const EditPlayerNameModal = ({
  playerImg,
  checkShowEditModal,
  updatePlayerName,
}: {
  playerImg: Turn;
  checkShowEditModal: (newImgSrc: Player['imgSrc'], showModal: boolean) => void;
  updatePlayerName: (playerImg: Player['imgSrc'], newName: string) => void;
}) => {
  const [inputName, setInputName]: InputNameState = useState<string>('');
  const [
    showInputErrorMessage,
    setInputShowErrorMessage,
  ]: ShowInputErrorMessageState = useState<boolean>(false);

  const handleCloseClick = () => {
    document.body.classList.remove('no-scroll');
    checkShowEditModal(playerImg, false);
  };

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputName(value);
    setInputShowErrorMessage(false);
  };

  const handleAcceptClick = (playerImg: Player['imgSrc'], newName: string) => {
    if (!newName) {
      setInputShowErrorMessage(true);

      return;
    }

    // Save the player new name
    updatePlayerName(playerImg, newName);

    checkShowEditModal(playerImg, false);
  };

  return (
    <div className="tic-tac-toe--edit-player-name-modal">
      <div className="tic-tac-toe--modal-body">
        <button
          className="tic-tac-toe--modal-close-button"
          onClick={handleCloseClick}
        >
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
          value={inputName}
          onChange={handleNameInput}
        />
        {showInputErrorMessage && (
          <p className="tic-tac-toe--input-error-message">
            Please enter a name
          </p>
        )}
        <button
          className="tic-tac-toe--modal-accept-button"
          onClick={() => handleAcceptClick(playerImg, inputName)}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default EditPlayerNameModal;
