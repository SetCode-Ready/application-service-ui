import React, { FormEvent, useState } from 'react'
import styles from './style.module.scss'
import Back from '../../assets/back.png'
import { useHistory } from 'react-router'
import { api } from '../../services/axios'

export default function Create() {

  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [limitdate, setLimitdate] = useState('')
  const [budget, setBudget] = useState('')
  const [comments, setComments] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent){
    e.preventDefault()
    setLoading(true)

    try {
      if(title.length < 0){
        alert('Preencha o titulo!')
      } else if(new Date() > new Date(limitdate)) {
        alert('Insira uma data válida!')
      } else {

        api.post('/service', {
          title,
          description,
          limitDate: new Date(limitdate).toISOString(),
          budget,
          comments,
          status: 'Aberto'
        })
      }
      
      history.push('/')
    } catch (e) {
      alert(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.CreateContanier} >
      <img src={Back} alt="adicionar todo" onClick={() => history.push('/')} />

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

        {loading ? <button type="submit" disabled >Cadastrar</button> : <button type="submit" >Cadastrar</button>}
      </form>
    </main>
  )
}
