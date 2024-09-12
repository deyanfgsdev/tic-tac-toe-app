export const storageSaveGame = ({ board, turn, scores }) => {
  localStorage.setItem("tic-tac-toe--board", JSON.stringify(board));
  localStorage.setItem("tic-tac-toe--turn", JSON.stringify(turn));

  if (scores) {
    localStorage.setItem("tic-tac-toe--scores", JSON.stringify(scores));
  }
};

export const storagePlayAgain = () => {
  localStorage.removeItem("tic-tac-toe--board");
  localStorage.removeItem("tic-tac-toe--turn");
};

export const storageRestartGame = () => {
  localStorage.removeItem("tic-tac-toe--board");
  localStorage.removeItem("tic-tac-toe--turn");
  localStorage.removeItem("tic-tac-toe--scores");
};
