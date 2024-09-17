import './Footer.scss'
import rrssData from '../../data/rrssData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <footer>
      <address className='tic-tac-toe--footer-author'>
        &copy; 2024 Developed by deyanfgsdev
      </address>
      <div className='tic-tac-toe--footer-rrss'>
        {rrssData.map((item) => (
          <a href={item.url} target='_blank' key={item.id} rel='noreferrer'>
            <FontAwesomeIcon icon={item.icon} />
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
