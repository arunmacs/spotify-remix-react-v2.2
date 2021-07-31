import {BsFillPlayFill, BsPauseFill} from 'react-icons/bs'

import './index.css'

const MusicPlayer = props => {
  const {pause, playingSong, playPauseStatus} = props
  const {album, artists, name, previewUrl} = playingSong

  //   console.log(playingSong, 'album')

  let image

  if (album !== undefined) {
    image = album.images.reduce((prev, curr) =>
      prev.height < curr.height ? prev : curr,
    )
    image = image.url
  } else {
    image = null
  }

  let artist

  if (artists !== undefined) {
    artist = artists[0].name
  } else {
    artist = 'Artist'
  }

  const onClickPlayPauseSong = () => {
    playPauseStatus()
    const audio = document.getElementById('music')
    if (!pause) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  return (
    <div className="music-player">
      <img src={image} alt="album" className="album-img" />
      <div className="album-info">
        <p className="album-name">{name}</p>
        <div className="artist-div">
          <span className="artist-name">{artist}</span>
          {/* {artists.map(item => (
            
          ))} */}
        </div>
      </div>
      <div className="music-controls">
        <audio id="music">
          <source src={previewUrl} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>
        <button
          type="button"
          onClick={onClickPlayPauseSong}
          className="play-pause-button"
        >
          {!pause ? (
            <BsFillPlayFill className="play-pause-icon" />
          ) : (
            <BsPauseFill className="play-pause-icon" />
          )}
        </button>
      </div>
    </div>
  )
}

export default MusicPlayer
