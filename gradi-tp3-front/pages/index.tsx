import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { FiMusic } from 'react-icons/fi'

import Loading from 'components/loading'
import Musics from 'components/musics'

import { Music } from 'components/musics'

const API_URL = 'http://localhost:3333/'

const Home = () => {

  const router = useRouter()

  const [data, setData] = useState<Music[]>()

  const [filter, setFilter] = useState<string>('')

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (filter === '') return

    try {
      setLoading(true)
      const res = await axios.get(
        'songs',
        {
          baseURL: API_URL,
          params: { filter }
        }
      )
      console.log(res)

      setTimeout(() => {
        setData(res.data)
        setLoading(false)
      }, 2000)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='container home'>
      <Loading loading={loading} text='Procurando músicas'/>

      {Boolean(!loading && !data) && (
        <form onSubmit={handleSubmit}>
          <h2>Encontre sua música favorita</h2>

          <input
            type='text'
            placeholder='Pesquise pelo título, artista, categoria ou letra'
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />

          <button style={{ margin: '1rem 0' }} type='submit'>Pesquisar</button>

          <span onClick={() => router.push('musicas/enviar')}>
            <p>Enviar música</p>
            <FiMusic />
          </span>
        </form>
      )}

      {Boolean(!loading && data) && (
        <span onClick={() => setData(undefined)}>Pesquisar novamente</span>
      )}

      <Musics data={data}/>
    </div>
  )
}

export default Home
