import "./App.scss";

import Logo from "./components/Logo/Logo";
import Board from "./components/Board/Board";

const App = () => {
  const logoSrc = "https://i.ibb.co/BwT2KCS/logo.png";

  return (
    <>
      <div className="tic-tact-toe-app">
        <Logo logoSrc={logoSrc} />
        <Board />
      </div>
    </>
  );
};

export default App;
