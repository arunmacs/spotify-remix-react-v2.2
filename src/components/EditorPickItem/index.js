import {Component} from 'react'
import {BsArrowLeft} from 'react-icons/bs'
import {FaPlay, FaPause} from 'react-icons/fa'
import moment from 'moment'
import './index.css'

class EditorPickItem extends Component {
  state = {
    playlistData: [],
    playlistInfo: {},
    playingSong: {},
    isPlaying: false,
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
    const specificItemApiUrl = `https://api.spotify.com/v1/users/spotify/playlists/${id}`

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
        owner: data.owner,
        type: data.type,
        uri: data.uri,
      }

      const updatedData = data.tracks.items.map(item => ({
        album: item.track.album,
        artists: item.track.artists,
        discNumber: item.track.disc_number,
        durationMs: item.track.duration_ms,
        href: item.track.href,
        id: item.track.id,
        name: item.track.name,
        previewUrl: item.track.preview_url,
      }))

      this.setState({playlistData: updatedData, playlistInfo: updatedInfo})
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

  renderSongsList = () => {
    const {playlistData} = this.state

    return playlistData.map(item => {
      this.onClickPlaySong = () => {
        this.setState({playingSong: item})
      }

      return (
        <button
          type="button"
          key={item.id}
          onClick={this.onClickPlaySong}
          className="song-button"
        >
          <li className="song-item">
            <div className="song-info">
              <p className="song-name">{item.name}</p>
              <div className="artists-div">
                {item.artists.map(artist => (
                  <span className="song-artist" key={artist.id}>
                    {artist.name}
                  </span>
                ))}
              </div>
            </div>
            <span className="song-duration">
              {this.getDurationTime(item.durationMs)}
            </span>
          </li>
        </button>
      )
    })
  }

  changePlayPauseStatus = () => {
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  playSong = () => {
    console.log()

    return <FaPlay className="play-pause-icon" />
  }

  pauseSong = () => {
    console.log()

    return <FaPause className="play-pause-icon" />
  }

  renderPlayer = () => {
    const {playingSong, isPlaying} = this.state

    return (
      <div className="player-container">
        <audio autoPlay src={playingSong.previewUrl} type="audio/mpeg">
          <track kind="captions" srcLang="en" />
        </audio>
        <div className="song-container">
          <div className="playing-song">
            <p className="song-name">{playingSong.name}</p>
            <span className="song-artist">HI</span>
          </div>
          <button
            type="button"
            onClick={this.changePlayPauseStatus}
            className="play-pause-button"
          >
            {isPlaying ? this.pauseSong() : this.playSong()}
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {playlistInfo, playSong} = this.state

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

export default EditorPickItem
