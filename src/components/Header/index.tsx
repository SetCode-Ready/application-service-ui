import styles from './style.module.scss'
import logo from '../../assets/logo.png'
import { useHistory } from 'react-router'

export default function Header() {
  const history = useHistory()

  return (
    <header className={styles.HeaderContainer} onClick={() => history.push('/')} >
      <img src={logo} alt="logo" />
      <h2>YOUR SERVICES TO DO</h2>
    </header>
  )
}
