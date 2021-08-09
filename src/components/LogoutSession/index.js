import {withRouter} from 'react-router-dom'

const LogoutSession = () => {
  const {history} = this.props
  localStorage.removeItem('pa_token')

  history.replace('/login')
}

export default withRouter(LogoutSession)
