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
  text: string
}

const Loading = (props: Props) => {

  const { loading, text } = props

  const classes = useStyles()

  if (!loading) return null

  return (
    <div className={classes.container}>
      <h2 style={{ marginBottom: '2rem' }}>{text}</h2>
      <CircularProgress className={classes.circularProgress} size='3rem' />
    </div>
  )
}

export default Loading
