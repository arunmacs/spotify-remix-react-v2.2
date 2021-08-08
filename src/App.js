import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import YourPlayLists from './components/YourPlayLists'
import YourMusic from './components/YourMusic'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import EditorPickPlaylist from './components/EditorPickPlaylist'
import NewReleasePlaylist from './components/NewReleasePlaylist'
import PlayListAlbum from './components/PlayListAlbum'
import GenreCategory from './components/GenreCategory'
import GenreAlbumPlaylist from './components/GenreAlbumPlaylist'
import Search from './components/Search'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/your-music" component={YourMusic} />
      <ProtectedRoute exact path="/playlists" component={YourPlayLists} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute
        exact
        path="/editor-pick/:id"
        component={EditorPickPlaylist}
      />
      <ProtectedRoute
        exact
        path="/new-releases/album/:id"
        component={NewReleasePlaylist}
      />
      <ProtectedRoute
        exact
        path="/your-playlists/:id"
        component={PlayListAlbum}
      />
      <ProtectedRoute
        exact
        path="/genre/:categoryId"
        component={GenreCategory}
      />
      <ProtectedRoute
        exact
        path="/genre/:categoryId/:id/playlist"
        component={GenreAlbumPlaylist}
      />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/search/playlist/:id" />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
