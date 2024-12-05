import './Logo.scss';

import { ImgBBUrl } from './Logo.types';

const LOGO_SRC: ImgBBUrl = 'https://i.ibb.co/CHJkpRX/tic-tac-toe-logo.png';

const Logo = () => {
  return (
    <div className="tic-tac-toe--logo">
      <img
        src={LOGO_SRC}
        alt="Tic Tac Toe Logo"
        className="tic-tac-toe--logo-img"
      />
    </div>
  );
};

export default Logo;
