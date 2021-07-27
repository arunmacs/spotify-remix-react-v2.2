import {Component} from 'react'
import moment from 'moment'
import {BsArrowLeft} from 'react-icons/bs'
import SongItem from '../SongItem'

import './index.css'

class NewReleaseAlbum extends Component {
  state = {
    playlistData: [],
    playlistInfo: {},
    playingSong: {},
  }

  componentDidMount() {
    this.getSpecificItem()
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token', '')
    return token
  }

  onClickGoBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  getSpecificItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = this.getAccessToken()
    const specificItemApiUrl = `https://api.spotify.com/v1/albums/${id}`

    const specificItemOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(specificItemApiUrl, specificItemOptions)

    if (response.ok === true) {
      const data = await response.json()

      const updatedInfo = {
        href: data.href,
        id: data.id,
        images: data.images[0].url,
        name: data.name,
        type: data.type,
        uri: data.uri,
      }

      const updatedData = data.tracks.items.map(item => ({
        artists: item.artists,
        durationMs: item.duration_ms,
        id: item.preview_url,
        href: item.href,
        name: item.name,
        album: [data.images],
        previewUrl: item.preview_url,
      }))

      this.setState({playlistData: updatedData, playlistInfo: updatedInfo})
    }
  }

  renderSongsList = () => {
    const {playlistData} = this.state

    return (
      <>
        {playlistData.map(item => (
          <SongItem songData={item} key={item.id} />
        ))}
      </>
    )
  }

  renderPlayer = () => {
    const {playingSong} = this.state

    return (
      <div className="player-container">
        <audio
          autoPlay
          controls
          src={playingSong.previewUrl}
          style={{width: '100%', height: '56px'}}
          type="audio/mpeg"
        >
          <track kind="captions" srcLang="en" />
        </audio>
      </div>
    )
  }

  render() {
    const {playlistInfo} = this.state

    return (
      <div className="editor-pick-item-container">
        <div className="back-arrow-container">
          <button
            type="button"
            onClick={this.onClickGoBack}
            className="back-button"
          >
            <BsArrowLeft className="back-arrow" />
          </button>
          <p className="back-text">Back</p>
        </div>
        <div className="specific-item-container">
          <div className="specific-item-info">
            <img
              src={playlistInfo.images}
              alt=""
              className="specific-item-image"
            />
            <h1 className="specific-item-name">{playlistInfo.name}</h1>
          </div>
          <ul className="specific-item-list">{this.renderSongsList()}</ul>
        </div>
        {this.renderPlayer()}
      </div>
    )
  }
}

export default NewReleaseAlbum
