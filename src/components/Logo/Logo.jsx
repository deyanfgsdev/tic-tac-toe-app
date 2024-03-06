import "./Logo.scss";

const Logo = ({ logoSrc }) => {
  return (
    <div className="tic-tact-toe-logo">
      <img
        src={logoSrc}
        alt="Tic tac toe Logo"
        className="tic-tact-toe-logo-img"
      />
    </div>
  );
};

export default Logo;
