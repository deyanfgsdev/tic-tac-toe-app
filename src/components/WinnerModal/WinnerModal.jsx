import "./WinnerModal.scss";

import initialPlayersData from "../../data/initialPlayersData";

const WinnerModal = ({ winnerPlayer, playAgain }) => {
  if (winnerPlayer === null) return;

  const winnerPlayerImg = initialPlayersData.find(
    (player) => player.imgSrc === winnerPlayer
  );

  const className = winnerPlayerImg
    ? "tic-tac-toe--winner-modal tic-tac-toe--winner-modal-show"
    : "tic-tac-toe--winner-modal";

  const handlePlayAgainClick = () => {
    playAgain();
  };

  return (
    <div className={className}>
      <div className="tic-tac-toe--modal-body">
        {winnerPlayerImg && (
          <>
            <h2 className="tic-tac-toe--modal-title">🥳Congratulations!🥳</h2>
            <p className="tic-tac-toe--modal-description">The winner is:</p>
            <img
              src={winnerPlayerImg.imgSrc}
              alt="Winner player"
              className="tic-tac-toe--modal-player-img"
            />
          </>
        )}

        {!winnerPlayerImg && (
          <>
            <h2 className="tic-tac-toe--modal-title">😅It is a tie!😅</h2>
            <p className="tic-tac-toe--modal-description">
              There is no winner this time
            </p>
          </>
        )}
        <button
          className="tic-tac-toe--modal-play-again-button"
          onClick={handlePlayAgainClick}
        >
          Play again
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
