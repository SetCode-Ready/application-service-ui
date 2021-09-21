import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Back from '../../assets/back.png'
import Edit from '../../assets/edit.png'
import { useHistory, useParams } from 'react-router'
import { api } from '../../services/axios'

interface ServiceProps{
  id: string;
  docId: string;
  status: string;
  title: string;
  description: string;
  comments: string;
  creationDate: string;
  limitDate: string;
  budget: string | number;
}

interface Params {
  id: string
}

export default function View() {
  const {id} = useParams<Params>()
  const history = useHistory()

  const [service, setService] = useState<ServiceProps>()

  let color = ''
  
  switch (service?.status) {
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

  async function handleGetService(): Promise<void>{
    try {
      const response = await api.get(`/service/${id}`)

      setService(response.data.service)
      console.log(response.data.service)
    } catch (e) {
      alert(e)
    }
  }

  async function handleChangeStatus(status: String){
    await api.put(`/service/${service?.docId}`,{
          title: service?.title,
          description: service?.description,
          limitDate: service?.limitDate,
          budget: service?.budget,
          comments: service?.comments,
          status
    })
    
    history.push('/')
  }

  useEffect(() => {
    handleGetService()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className={styles.CreateContanier} >
      <img className={styles.back} src={Back} alt="adicionar todo" onClick={() => history.push('/')} />

      {service?.status !== "Aberto" ? <img className={styles.editDisabled} src={Edit} alt="Botão de edição" />
      :
      <img className={styles.edit} src={Edit} alt="Botão de edição" onClick={() => history.push(`/edit/${id}`)} />
      }
      
      <div >
        <h1>{service?.title}</h1>
        
        <p>{service?.description}</p>
        
        { service?.creationDate && service?.limitDate && <time>{new Date(service?.creationDate || new Date(service!.creationDate)).toLocaleDateString('pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}

          - 

        {new Date(service?.limitDate || new Date()).toLocaleDateString('pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}
        </time>}


        <p style={{background: color}} className={styles.status} >{service?.status}</p>

        <h2>Orçamento:</h2>

        { service?.budget && <p className={styles.value} >Valor: {new Intl.NumberFormat ('pt-BR', {
          style: 'currency',
          currency: 'BRL'
          }).format(Number(service!.budget))}
        </p>}

        <h2>COMENTÁRIOS OU OBSERVAÇÕES:</h2>

        <p>{service?.comments}</p>
      
        <h2>Ações:</h2>
        {service?.status !== "Aberto" ? 
        <div className={styles.ButtonContainer} >
          <button disabled className={styles.completeDisabled} >Concluir</button>
          <button disabled className={styles.cancelDisabled} >Cancelar</button>
        </div>
        :
        <div className={styles.ButtonContainer} >
          <button onClick={() => handleChangeStatus('Concluido')}  className={styles.complete} >Concluir</button>
          <button onClick={() => handleChangeStatus('Fechado')} className={styles.cancel} >Cancelar</button>
        </div>
        }
      </div>
    </main>
  )
}
