import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { FiMusic } from 'react-icons/fi'

import Loading from 'components/loading'
import Musics from 'components/musics'

import { Music } from 'components/musics'

const API_URL = 'http://localhost:3001/'

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
        'endpoint',
        {
          baseURL: API_URL,
          params: { filter }
        }
      )
      console.log(res)

      setTimeout(() => {
        // setData(res.data)
        setData([
          {
            title: 'USO',
            artist: 'SID',
            length: 120,
            categories: ['Pop Rock, Japan Rock'],
            file: 'musics/uso.mp3',
            lyrics: 'あの日見た空 茜色の空を ねぇ君は覚えていますか 約束契り初夏の風が包む 二人寄り添った 無理な笑顔の裏 伸びた影を匿う だから気づかぬように 再生を選ぶテーブルの上の 震えない知らせ 待ち続けて 空白の夜も 来るはずのない朝も'
          },
          {
            title: 'The Day',
            artist: 'Boku no Hero',
            length: 240,
            categories: ['Pop Rock, Japan Rock, Anime Music'],
            file: 'musics/the_day.mp3',
            lyrics: 'Shizukesa ga jimikomu yō de Iki o tometa gozen goji Hiyō wo kaidan de tsume o kamu asu wa docchida The day has come'
          },
        ])
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

      {Boolean(!loading && data) && (
        <span onClick={() => setData(undefined)}>Pesquisar novamente</span>
      )}

      <Musics data={data}/>
    </div>
  )
}

export default Home
