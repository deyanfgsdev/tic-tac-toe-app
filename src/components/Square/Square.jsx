import './Square.scss'

import initialPlayersData from '../../data/initialPlayersData'

const Square = ({ children, index, updateBoard }) => {
  const playerAlt =
    children === initialPlayersData[0].imgSrc
      ? initialPlayersData[0].alt
      : initialPlayersData[1].alt

  const handleSquareClick = () => {
    updateBoard(index)
  }

  return (
    <div className='tic-tac-toe--square' onClick={handleSquareClick}>
      {children && (
        <img
          src={children}
          alt={playerAlt}
          className='tic-tac-toe--square-img'
        />
      )}
    </div>
  )
}

export default Square
