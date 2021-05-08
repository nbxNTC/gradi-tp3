import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { FiFilePlus } from 'react-icons/fi'

import Loading from 'components/loading'

interface FormState {
  values: {
    title: string,
    description: string,
    categories: string,
    length: number
  }
}

const AddMusic = () => {

  const router = useRouter()

  const initialFormState: FormState = {
    values: {
      title: '',
      description: '',
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
    if (!files || !files.length || files[0].type !== 'audio/mpeg') return

    setFile(files[0])
  }

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, description, categories, length } = formState.values

    const body = {
      title,
      description,
      length,
      categories: categories.split(';'),
      file
    }

    setLoading(true)
    console.log(body)
  }

  return (
    <div className='container add-music'>
      <Loading loading={loading}/>

      {Boolean(!loading) && (
        <form onSubmit={handleSubmit}>
          <h1>Envie sua música para nós</h1>

          <input
            type='text'
            placeholder='Nome da música'
            name='title'
            value={formState.values.title}
            onChange={handleChange}
          />

          <textarea
            style={{ resize: 'none' }}
            placeholder='Descrição'
            name='description'
            rows={4}
            value={formState.values.description}
            onChange={handleChange}
          />

          <input
            type='text'
            placeholder='Categorias (separados por ponto e vírgula)'
            name='categories'
            value={formState.values.categories}
            onChange={handleChange}
          />

          <input
            type='number'
            placeholder='Tamanho da música (segundos)'
            name='length'
            value={formState.values.length || ''}
            onChange={handleChange}
          />

          {!file && (
            <span onClick={() => document.getElementById('uploadFile').click()}>
              <p>Anexar arquivo</p>
              <FiFilePlus />
              <input
                type='file'
                style={{ display: 'none' }}
                accept='audio/mpeg'
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
