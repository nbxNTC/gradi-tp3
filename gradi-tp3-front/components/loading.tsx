import { makeStyles, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circularProgress: {
    color: 'white'
  }
}))

interface Props {
  loading: boolean
}

const Loading = (props: Props) => {

  const { loading } = props

  const classes = useStyles()

  if (!loading) return null

  return (
    <div className={classes.container}>
      <h2 style={{ marginBottom: '2rem' }}>Carregando músicas</h2>
      <CircularProgress className={classes.circularProgress} size='3rem' />
    </div>
  )
}

export default Loading
