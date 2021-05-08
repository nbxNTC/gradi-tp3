import { useState } from 'react'
import { useRouter } from 'next/router'

import { FiMusic } from 'react-icons/fi'

import Loading from 'components/loading'

const Home = () => {

  const router = useRouter()

  const [data, setData] = useState()

  const [filter, setFilter] = useState<string>('')

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    alert(filter)

    setLoading(true)
  }

  return (
    <div className='container home'>
      <Loading loading={loading}/>

      {Boolean(!loading && !data) && (
        <form onSubmit={handleSubmit}>
          <h1>Encontre sua música favorita</h1>

          <input
            type='text'
            placeholder='Pesquise pelo nome ou letra'
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
    </div>
  )
}

export default Home
