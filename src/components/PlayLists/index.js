import {Component} from 'react'
import NavBar from '../NavBar'
import './index.css'

class PlayLists extends Component {
  state = {yourPlayListData: []}

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
      console.log(data)

      const updatedData = data.items.map(item => ({
        collaborative: item.collaborative,
        description: item.description,
        external_urls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        owner: item.owner,
        primary_color: item.primary_color,
        explicit: item.explicit,
        public: item.public,
        snapshot_id: item.snapshot_id,
        tracks: item.tracks,
        type: item.type,
        uri: item.uri,
      }))
      console.log(updatedData)

      this.setState({yourPlayListData: updatedData})
    }
  }

  renderYourPlayLists = data => {
    const {images, name, tracks} = data

    return (
      <>
        <img src={images[2].url} alt={`album `} className="item-image" />
        <div className="item-info">
          <p className="item-name"># {name}</p>
          <p className="tracks">{tracks.total} Tracks</p>
        </div>
      </>
    )
  }

  render() {
    const {yourPlayListData} = this.state

    return (
      <div className="app-body">
        <NavBar />
        <div className="main-container">
          <h1 className="playlist-name">Your Playlists</h1>
          {yourPlayListData.map(item => (
            <div className="your-music-container" key={item.id}>
              {this.renderYourPlayLists(item)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default PlayLists
