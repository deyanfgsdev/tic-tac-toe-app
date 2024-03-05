import "./App.scss";
import Board from "./components/Board/Board";

function App() {
  return (
    <>
      <div className="tic-tact-toe-app">
        <h1 className="tic-tact-toe-main-title">Tic tac toe Game</h1>
        <Board />
      </div>
    </>
  );
}

export default App;
