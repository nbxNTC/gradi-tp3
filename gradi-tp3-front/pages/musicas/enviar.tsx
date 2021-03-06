import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from'axios'

import Loading from 'components/loading'

const API_URL = 'http://localhost:3333/'

interface FormState {
  values: {
    title: string,
    artist: string,
    categories: string,
    length: number
  }
}

const AddMusic = () => {

  const router = useRouter()

  const initialFormState: FormState = {
    values: {
      title: '',
      artist: '',
      categories: '',
      length: undefined
    }
  }

  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [file, setFile] = useState<File>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: value
      }
    }))
  }

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files || !files.length || files[0].type !== 'audio/wav') return

    setFile(files[0])
  }

  const [loading, setLoading] = useState(false)
  const [resStatus, setResStatus] = useState<'success' | 'error'>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, artist, categories, length } = formState.values

    const formData = new FormData()
    formData.append('title', title)
    formData.append('artist', artist)
    formData.append('length', String(length))
    formData.append('categories', categories)
    formData.append('song', file)

    try {
      setLoading(true)
      const res = await axios.post(
        'songs',
        formData,
        {
          baseURL: API_URL,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(res)

      setTimeout(() => {
        setResStatus('success')
        setLoading(false)
      }, 2000)
    } catch (error) {
      console.log(error)
      setResStatus('error')
      setLoading(false)
    }
  }

  return (
    <div className='container add-music'>
      <Loading loading={loading} text='Enviando m??sica'/>
      {resStatus && (
        <div>
          <h2 style={{ marginBottom: '2rem' }}>
            {resStatus === 'success' && 'M??sica enviada com sucesso!'}
            {resStatus === 'error' && 'Ocorreu um problema ao enviar m??sica!'}
          </h2>
          <button onClick={() => router.back()}>
            Voltar para tela inicial
          </button>
        </div>
      )}

      {Boolean(!loading && !resStatus) && (
        <form onSubmit={handleSubmit}>
          <h2>Envie sua m??sica para n??s</h2>

          <input
            type='text'
            placeholder='Nome da m??sica'
            name='title'
            value={formState.values.title}
            onChange={handleChange}
          />

          <input
            type='text'
            placeholder='Artista'
            name='artist'
            value={formState.values.artist}
            onChange={handleChange}
          />

          <input
            type='text'
            placeholder='Categorias (separados por ponto e v??rgula)'
            name='categories'
            value={formState.values.categories}
            onChange={handleChange}
          />

          <input
            type='number'
            placeholder='Tamanho da m??sica (segundos)'
            name='length'
            value={formState.values.length || ''}
            onChange={handleChange}
          />

          {!file && (
            <span onClick={() => document.getElementById('uploadFile').click()}>
              <p>Anexar arquivo</p>
              <input
                type='file'
                style={{ display: 'none' }}
                accept='audio/wav'
                id='uploadFile'
                onChange={handleUploadFile} 
              />
            </span>
          )}

          {file && (
            <span onClick={() => setFile(null)}>
              <p>Remover arquivo selecionado: {file.name}</p>
            </span>
          )}

          <button style={{ margin: '3rem 0 .6rem' }} type='submit'>Enviar</button>
          <span onClick={() => router.back()}>Voltar</span>
        </form>
      )}
    </div>
  )
}

export default AddMusic
