import {Component} from 'react'
import NavBar from '../NavBar'
import PlayListItem from '../PlayListItem'
import LoaderView from '../LoaderView'
import './index.css'

class YourPlayLists extends Component {
  state = {yourPlayListData: [], isLoading: true}

  componentDidMount() {
    this.getYourPlayLists()
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token', '')
    return token
  }

  getYourPlayLists = async () => {
    const token = this.getAccessToken()

    const userApiUrl = 'https://api.spotify.com/v1/me'
    const userOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const userDataResponse = await fetch(userApiUrl, userOptions)
    const userData = await userDataResponse.json()
    const {username} = userData

    const yourPlaylistsApiUrl = `https://api.spotify.com/v1/users/${username}/playlists?limit=50`
    const yourPlaylistsOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(yourPlaylistsApiUrl, yourPlaylistsOptions)
    if (response.ok === true) {
      const data = await response.json()

      const updatedPlaylistData = data.items.map(item => ({
        collaborative: item.collaborative,
        description: item.description,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        owner: item.owner,
        primaryColor: item.primary_color,
        public: item.public,
        snapshotId: item.snapshot_id,
        tracks: item.tracks,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({yourPlayListData: updatedPlaylistData, isLoading: false})
    }
  }

  renderPage = () => {
    const {yourPlayListData} = this.state

    return (
      <div className="your-playlist-container">
        <h1 className="your-playlist-name">Your Playlists</h1>
        <ul className="your-playlist-music-container">
          {yourPlayListData.map(item => (
            <PlayListItem playListItem={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="your-playlist-main-container">
        <NavBar />
        {isLoading ? <LoaderView /> : this.renderPage()}
      </div>
    )
  }
}

export default YourPlayLists
