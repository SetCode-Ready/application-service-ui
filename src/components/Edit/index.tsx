import React, { FormEvent, useEffect, useState } from 'react'
import styles from './style.module.scss'
import Back from '../../assets/back.png'
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

export default function Edit() {

  const {id} = useParams<Params>()
  const history = useHistory()

  const [service, setService] = useState({} as ServiceProps)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [limitdate, setLimitdate] = useState('')
  const [budget, setBudget] = useState('')
  const [comments, setComments] = useState('')

  async function handleGetService(){
    try {
      const { data } = await api.get(`/service/${id}`)
      console.log(data)
      setService(data.service)
    } catch (e) {
      alert(e)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function populateForm(){

    setTitle(service.title)
    setDescription(service.description)
    setLimitdate(String(service.limitDate).substr(0,10))
    setBudget(String(service.budget))
    setComments(service.comments)
  }

  async function handleSubmit(e: FormEvent){
    e.preventDefault()

    try {
      if(title.length < 0){
        alert('Preencha o titulo!')
      } else if(new Date() > new Date(limitdate)) {
        alert('Insira uma data válida!')
      } else {

        await api.put(`/service/${id}`, {
          title,
          description,
          limitDate: new Date(limitdate).toISOString(),
          budget,
          comments,
          status: 'Aberto'
        })
      }

      history.push(`/view/${service.docId}`)
      
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    handleGetService()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    populateForm()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service])

  return (
    <main className={styles.CreateContanier} >
      <img src={Back} alt="adicionar todo" onClick={() => history.push(`/view/${service.docId}`)} />

      <form onSubmit={handleSubmit} >
        <fieldset>
          <label className={styles.title} >TITULO</label>
          <input value={title} onChange={({target}) => setTitle(target.value)} />
        </fieldset>

        <fieldset>
          <label>DESCRIÇÃO</label>
          <textarea value={description} onChange={({target}) => setDescription(target.value)} />
        </fieldset>

        <fieldset>
          <label>DATA DE CONCLUSÃO (LIMITE)</label>
          <input type="date" value={limitdate} onChange={({target}) => setLimitdate(target.value)} />
        </fieldset>
        
        <fieldset>
          <label>ORÇAMENTO</label>
          <input type='number' value={budget} onChange={({target}) => setBudget(target.value)} />
        </fieldset>
        
        <fieldset>
          <label>COMENTÁRIOS E OBSERVAÇÕES</label>
          <textarea value={comments} onChange={({target}) => setComments(target.value)} />
        </fieldset>

        <button type="submit" >Atualizar</button>
      </form>
    </main>
  )
}
