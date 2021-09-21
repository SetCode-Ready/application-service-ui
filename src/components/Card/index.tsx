import { useHistory } from 'react-router';
import styles from './style.module.scss'

interface CardProps{
  docId: string;
  id: string;
  status: string;
  title: string;
  description: string;
  limitDate: string;
}

export default function Card({docId, id, status, title, description, limitDate}: CardProps) {
  const history = useHistory()

  let color = ''
  
  switch (status) {
    case 'Aberto':
      color = '#FFED4B';
      break;
    case 'Fechado':
      color = '#FF4B4B';
      break;
    case 'Concluido':
      color = '#4FFF4B';
      break;
    default:
      break;
  }
  
  return (
    <div onClick={() => history.push(`/view/${docId}`)}  className={styles.ContentContanier} >
      <p style={{background: color}} >{status}</p>

      <h1>{title}</h1>
      <span>{description}</span>
      <time>{new Date(limitDate).toLocaleDateString('pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}
      </time>
    </div>
  )
}
