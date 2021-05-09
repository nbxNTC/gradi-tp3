import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '40rem',
    padding: '2rem',
    margin: '.5rem 0',

    backgroundColor: 'white',
    borderRadius: 8,
    color: 'black',

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    '&>article': {
      width: '45%',
    }
  }
}))

export interface Music {
  title: string
  artist: string
  length: number
  categories: string[]
  file: string
  lyrics: string
}

interface Props {
  data: Music[]
}

const Musics = (props: Props) => {

  const { data } = props

  const classes = useStyles()

  const formatCategories = (categories: string[]) => {
    let newValue = ''

    categories.forEach((item, index) => {
      if (index !== categories.length - 1) newValue += `${item}, `
      else newValue += item
    })

    return newValue
  }

  return (
    <div className={classes.container}>
      {Boolean(data && data.length) && data.map((item, index) => (
        <div className={classes.card} key={index}>
          <article style={{ marginRight: '2rem' }}>
            <h3>Nome da música</h3>
            <p>{item.title}</p>
            <h3 style={{ marginTop: '1rem' }}>Artista</h3>
            <p>{item.artist}</p>
          </article>

          <article>
            <h3>Tamanho (em segundos)</h3>
            <p>{item.length} segundos</p>
            <h3 style={{ marginTop: '1rem' }}>Categorias</h3>
            <p>{formatCategories(item.categories)}</p>
          </article>

          <article style={{ width: '100%' }}>
            <h3 style={{ marginTop: '1rem' }}>Letra da música</h3>
            <p>{item.lyrics}</p>
          </article>

          <article style={{ width: '100%' }}>
            <h3 style={{ margin: '1rem 0' }}>Player de áudio</h3>
            <audio
              style={{ width: '100%' }}
              controls
              src={item.file}
            />
          </article>
        </div>
      ))}
    </div>
  )
}

export default Musics
