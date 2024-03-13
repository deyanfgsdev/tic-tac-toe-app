import "./App.scss";

import Logo from "./components/Logo/Logo";
import Board from "./components/Board/Board";
import Footer from "./components/Footer/Footer";
import Player from "./components/Player/Player";

import playersData from "./data/playersData";

const App = () => {
  const logoSrc = "https://i.ibb.co/CHJkpRX/tic-tac-toe-logo.png";
  const playersList = playersData.map((player) => {
    return (
      <li className="tic-tac-toe-player" key={player.id}>
        <Player
          playerId={player.id}
          initialPlayerName={player.name}
          initialCurrentTurn={player.isYourTurn}
          initialIsWinner={player.winner}
          imgSrc={player.imgSrc}
          alt={player.alt}
        />
      </li>
    );
  });

  return (
    <>
      <div className="tic-tact-toe-app">
        <div className="tic-tac-tope-content-wrap">
          <Logo logoSrc={logoSrc} />
          <Board />
          <div className="tic-tac-toe-players">
            <ul className="tic-tac-toe-players-list">{playersList}</ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
