import { useState } from 'react'
import axios from 'axios'

interface FormState {
  values: {
    name: string,
    email: string,
    password: string,
    phone: string
  }
}

const Home = () => {

  const initialFormState: FormState = {
    values: {
      name: '',
      email: '',
      password: '',
      phone: ''
    }
  }

  const [formState, setFormState] = useState<FormState>(initialFormState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, email, password, phone } = formState.values

    const url = `${process.env.NEXT_PUBLIC_API_URL}/user`
    const data = { name, email, password, phone }

    try {
      const apiRes = await axios.post(url, data)
      console.log(apiRes.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleProvider).then(async res => {
      const { displayName, email } = res.user

      const url = `${process.env.NEXT_PUBLIC_API_URL}/user`
      const data = { name: displayName, email }

      try {
        const apiRes = await axios.post(url, data)
        console.log(apiRes.data)
      } catch (error) {
        console.log(error)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='email' placeholder='E-mail' value={formState.values.email} onChange={handleChange}/>
      <input type='text' name='password' placeholder='Senha' value={formState.values.password} onChange={handleChange}/>

      <button type='submit'>Entrar</button>
      <button type='button' onClick={() => setFormState(initialFormState)}>Limpar</button>
      <button type='button' onClick={handleLoginGoogle}>Entrar com Google</button>
    </form>
  )
}

export default Home
