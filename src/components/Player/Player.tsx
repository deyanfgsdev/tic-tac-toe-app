import './Player.scss';

import { Player as GlobalPlayer } from '../../types/global';

const Player = ({
  name,
  imgSrc,
  alt,
  isYourTurn,
  checkShowEditModal,
}: {
  name: GlobalPlayer['name'];
  imgSrc: GlobalPlayer['imgSrc'];
  alt: string;
  isYourTurn: boolean;
  checkShowEditModal: (
    showModal: boolean,
    newImgSrc?: GlobalPlayer['imgSrc']
  ) => void;
}) => {
  const handleChangeNameClick = (imgSrc: GlobalPlayer['imgSrc']) => {
    checkShowEditModal(true, imgSrc);
  };

  const className = isYourTurn
    ? 'tic-tac-toe--img-container is-your-turn'
    : 'tic-tac-toe--img-container';

  return (
    <>
      <div className="tic-tac-toe--player">
        <div className={className}>
          <img src={imgSrc} alt={alt} className="tic-tac-toe-player--img" />
        </div>
        <h2 className="tic-tac-toe-player--name">{name}</h2>
        <button
          className="tic-tac-toe-player--change-name-button"
          onClick={() => handleChangeNameClick(imgSrc)}
        >
          Change name
        </button>
      </div>
    </>
  );
};

export default Player;
