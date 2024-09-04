import "./Logo.scss";

const Logo = ({ logoSrc }) => {
  return (
    <div className="tic-tac-toe--logo">
      <img
        src={logoSrc}
        alt="Tic Tac Toe Logo"
        className="tic-tac-toe--logo-img"
      />
    </div>
  );
};

export default Logo;
