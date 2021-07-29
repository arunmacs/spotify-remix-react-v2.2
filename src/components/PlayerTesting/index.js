import React from 'react'
import './index.css'

const file = {
  name: 'Nice piano and ukulele',
  author: 'Royalty',
  img: 'https://www.bensound.com/bensound-img/buddy.jpg',
  audio: 'https://www.bensound.com/bensound-music/bensound-buddy.mp3',
  duration: '2:02',
}

class PlayerTesting extends React.Component {
  playSong = () => {
    this.musicRef.play()
  }

  pauseSong = () => {
    this.musicRef.pause()
  }

  render() {
    return (
      <div>
        <h1>Music Player Testing In Progress</h1>
        <audio
          ref={ref => {
            this.musicRef = ref
          }}
        >
          <source src={file.audio} type="audio/ogg" />
          <track kind="captions" srcLang="en" />
        </audio>
        <button type="button" onClick={this.playSong}>
          <img src="/img/music.svg" alt="music" />
        </button>
        <button type="button" onClick={this.pauseSong}>
          <img src="/img/person.svg" alt="music" />
        </button>
      </div>
    )
  }
}

export default PlayerTesting
