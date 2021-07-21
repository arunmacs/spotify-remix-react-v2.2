import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import PlayLists from './components/PlayLists'
import YourMusic from './components/YourMusic'
import NotFound from './components/NotFound'

import Profile from './components/Profile'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/your-music" component={YourMusic} />
      <ProtectedRoute exact path="/playlists" component={PlayLists} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
