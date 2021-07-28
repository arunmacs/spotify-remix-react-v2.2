import {Component} from 'react'
import moment from 'moment'
import NavBar from '../NavBar'
import MusicPlayer from '../MusicPlayer'
import LoaderView from '../LoaderView'

import './index.css'

class YourMusic extends Component {
  state = {yourMusicPlayListData: [], playingSong: null, isLoading: true}

  componentDidMount() {
    this.getYourMusicPlayLists()
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token', '')
    return token
  }

  getYourMusicPlayLists = async () => {
    const token = this.getAccessToken()
    const yourMusicApiUrl = `https://api.spotify.com/v1/me/tracks`
    const yourMusicOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(yourMusicApiUrl, yourMusicOptions)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.items.map(item => ({
        href: item.track.href,
        id: item.track.id,
        name: item.track.name,
        album: item.track.album,
        artists: item.track.artists,
        durationMs: item.track.duration_ms,
        previewUrl: item.track.preview_url,
        popularity: item.track.popularity,
        trackNumber: item.track.trackNumber,
        type: item.track.type,
        uri: item.track.uri,
      }))
      //   console.log(updatedData)

      this.setState({yourMusicPlayListData: updatedData, isLoading: false})
    }
  }

  getDurationTime = inMilliSecs => {
    const inSecs = moment.duration(inMilliSecs).seconds()
    const inMins = moment.duration(inMilliSecs).minutes()

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  renderYourMusicPlayLists = data => {
    const {album, name, id, artists, durationMs, previewUrl} = data

    this.onClickSelectSong = () => {
      this.setState({playingSong: previewUrl})
    }

    return (
      <li className="music-item" onClick={this.onClickSelectSong} key={id}>
        <img src={album.images[2].url} alt={`album `} className="item-image" />
        <div className="item-info">
          <p className="item-name">{name}</p>
          <div className="artist-div">
            {artists.map(artist => (
              <span className="item-artist" key={artist.id}>
                {artist.name}
              </span>
            ))}
          </div>
        </div>
        <span className="item-duration">
          {this.getDurationTime(durationMs)}
        </span>
      </li>
    )
  }

  renderPage = () => {
    const {yourMusicPlayListData, playingSong} = this.state

    return (
      <>
        <div className="your-music-main-container">
          <h1 className="playlist-name">Your Music</h1>
          <ul className="your-music-container">
            {yourMusicPlayListData.map(item =>
              this.renderYourMusicPlayLists(item),
            )}
          </ul>
        </div>
        <MusicPlayer songUrl={playingSong} />
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-body">
        <NavBar />
        <div className="container">
          {isLoading ? <LoaderView /> : this.renderPage()}
        </div>
      </div>
    )
  }
}

export default YourMusic
