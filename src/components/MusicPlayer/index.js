import {Component} from 'react'
import {FaPlay, FaPause} from 'react-icons/fa'

import './index.css'

class MusicPlayer extends Component {
  state = {isPlaying: false}

  componentDidMount() {}

  componentWillUnmount() {}

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

  render() {
    const {isPlaying} = this.state

    return (
      <div className="player-container">
        <div className="song-container">
          <div className="playing-song">
            <p className="song-name">song name</p>
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
}

export default MusicPlayer
