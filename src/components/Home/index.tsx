/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Card from '../Card'

import Plus from '../../assets/plus.png'
import { useHistory } from 'react-router'
import { api } from '../../services/axios'

interface CardProps{
  id: string;
  docId: string;
  status: string;
  title: string;
  description: string;
  creationDate: string
  limitDate: string;
}

export default function Home() {

  const[services, setServices] = useState<CardProps[]>([])
  const[loading, setLoading] = useState(true)

  async function handleGetTodo(): Promise<void>{
    try{
      const response = await api.get('/service')
      setServices(response.data.services)

      console.log(response.data.services)
    }catch(e){
      alert(e)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    handleGetTodo()
  }, [])

  const history = useHistory()

  return (
    <main className={styles.HomeContanier} >
      {loading ? <h1>Carregando</h1> : 
      <>
        <img src={Plus} alt="adicionar todo" onClick={() => history.push('/create')} />
        {services.map(todo => (
          <Card key={todo.id} {...todo} />
        ))}
      </>
      }
      
    </main>
  )
}
