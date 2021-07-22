import {Component} from 'react'
import moment from 'moment'
import NavBar from '../NavBar'
import './index.css'

class YourMusic extends Component {
  state = {yourMusicPlayListData: []}

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
        availableMarkets: item.track.available_markets,
        artists: item.track.artists,
        discNumber: item.track.disc_number,
        durationMs: item.track.duration_ms,
        externalIds: item.track.external_ids,
        explicit: item.track.explicit,
        isLocal: item.track.isLocal,
        previewUrl: item.track.preview_url,
        externalUrls: item.track.external_urls,
        popularity: item.track.popularity,
        trackNumber: item.track.trackNumber,
        type: item.track.type,
        uri: item.track.uri,
      }))
      console.log(updatedData)

      this.setState({yourMusicPlayListData: updatedData})
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
    const {album, name, id, artists, durationMs} = data

    return (
      <>
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
      </>
    )
  }

  render() {
    const {yourMusicPlayListData} = this.state

    return (
      <div className="app-body">
        <NavBar />
        <div className="main-container">
          <h1 className="playlist-name">Your Music</h1>

          {yourMusicPlayListData.map(item => (
            <div className="your-music-container" key={item.id}>
              {this.renderYourMusicPlayLists(item)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default YourMusic
