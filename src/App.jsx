import './App.scss'

import Logo from './components/Logo/Logo'
import Board from './components/Board/Board'
import Footer from './components/Footer/Footer'

const App = () => {
  const logoSrc = 'https://i.ibb.co/CHJkpRX/tic-tac-toe-logo.png'

  return (
    <div className='tic-tac-toe--app'>
      <div className='tic-tac-toe--content-wrap'>
        <Logo logoSrc={logoSrc} />
        <Board />
      </div>
      <Footer />
    </div>
  )
}

export default App
