import "./WinnerModal.scss";

import initialPlayersData from "../../data/initialPlayersData";

const ModalWinner = () => {
  return (
    <div className="tic-tac-toe--winner-modal tic-tac-toe--winner-modal-show">
      <div className="tic-tac-toe--modal-body">
        <h2 className="tic-tac-toe--modal-title">🥳Congratulations!🥳</h2>
        <p className="tic-tac-toe--modal-description">The winner is:</p>
        <img
          src={initialPlayersData[0].imgSrc}
          alt="Winner player"
          className="tic-tac-toe--modal-player-img"
        />
        <button className="tic-tac-toe--modal-play-again-button">
          Play again
        </button>
      </div>
    </div>
  );
};

export default ModalWinner;
