import './WinnerModal.scss'

import initialPlayersData from '../../data/initialPlayersData'

const WinnerModal = ({ winnerPlayer, playAgain }) => {
  if (winnerPlayer === null) return

  const currentWinnerPlayer = initialPlayersData.find(
    (player) => player.imgSrc === winnerPlayer
  )

  if (currentWinnerPlayer) {
    document.body.classList.add('no-scroll')
  }

  const handlePlayAgainClick = () => {
    document.body.classList.remove('no-scroll')
    playAgain()
  }

  return (
    <div className='tic-tac-toe--winner-modal'>
      <div className='tic-tac-toe--modal-body'>
        {currentWinnerPlayer && (
          <>
            <h2 className='tic-tac-toe--modal-title'>🥳Congratulations!🥳</h2>
            <p className='tic-tac-toe--modal-description'>The winner is:</p>
            <img
              src={currentWinnerPlayer.imgSrc}
              alt='Winner player'
              className='tic-tac-toe--modal-player-img'
            />
          </>
        )}

        {!currentWinnerPlayer && (
          <>
            <h2 className='tic-tac-toe--modal-title'>😅It is a tie!😅</h2>
            <p className='tic-tac-toe--modal-description'>
              There is no winner this time
            </p>
          </>
        )}
        <button
          className='tic-tac-toe--modal-play-again-button'
          onClick={handlePlayAgainClick}
        >
          Play again
        </button>
      </div>
    </div>
  )
}

export default WinnerModal
