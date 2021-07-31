import React from 'react'
import {BsFillPlayFill, BsPauseFill} from 'react-icons/bs'

import './index.css'

class MusicPlayer extends React.Component {
  state = {pause: false}

  onClickPlayPauseSong = () => {
    const {pause} = this.state

    if (!pause) {
      this.audioElement.play()
    } else {
      this.audioElement.pause()
    }

    this.setState(prevState => ({pause: !prevState.pause}))
  }

  render() {
    const {pause} = this.state

    return (
      <div className="music-player-controls">
        <audio
          ref={ref => {
            this.audioElement = ref
          }}
        >
          <source src="" type="audio/ogg" />
          <track kind="captions" srcLang="en" />
        </audio>
        <button
          type="button"
          onClick={this.onClickPlayPauseSong}
          className="play-pause-button"
        >
          {!pause ? (
            <BsFillPlayFill className="play-pause-icon" />
          ) : (
            <BsPauseFill className="play-pause-icon" />
          )}
        </button>
      </div>
    )
  }
}

export default MusicPlayer
