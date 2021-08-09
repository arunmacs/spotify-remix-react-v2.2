import React from 'react'
import {FiPlay, FiPause} from 'react-icons/fi'
import {BiVolumeFull} from 'react-icons/bi'
import {BsSkipForward, BsSkipBackward} from 'react-icons/bs'
import NavBar from '../NavBar'
import BackNavigation from '../BackNavigation'
import AlbumDisplayInfo from '../AlbumDisplayInfo'
import SongItem from '../SongItem'

import './index.css'

class Player extends React.Component {
  state = {
    ...this.props,
    index: 0,
    pause: false,
    activeSongClass: 0,
    currTime: '0:00',
    seek: 0,
    volume: 5,
    screenSize: window.innerWidth,
  }

  componentDidMount() {
    this.playerRef.addEventListener('timeupdate', this.timeUpdate)
    this.playerRef.addEventListener('ended', this.nextSong)
    this.playerRef.addEventListener('volumechange', this.adjustVolume)
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    this.playerRef.removeEventListener('timeupdate', this.timeUpdate)
    this.playerRef.removeEventListener('ended', this.nextSong)
    this.playerRef.removeEventListener('volumechange', this.adjustVolume)
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.setState({screenSize: window.innerWidth})
  }

  getArtistName = artist => {
    if (artist !== undefined) {
      return artist[0].name
    }
    return 'Artist'
  }

  getAlbumImageArtist = currentSong => {
    const {album, artists} = currentSong
    let image
    let artist

    if (album !== undefined) {
      image = album.images.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr,
      )
      image = image.url
    } else {
      image = '/img/no-album-image.png'
    }

    if (artists !== undefined) {
      artist = artists[0].name
    } else {
      artist = 'Artist'
    }

    return {albumImage: image, albumArtist: artist}
  }

  prevSong = () => {
    const {index, activeSongClass, pause} = this.state

    if (index - 1 >= 0 && activeSongClass - 1 >= 0) {
      this.setState(
        {
          index: index - 1,
          activeSongClass: activeSongClass - 1,
        },
        this.updatePlayer,
      )
    } else {
      this.playerRef.pause()
      this.setState({pause: !pause})
    }
  }

  nextSong = () => {
    const {index, activeSongClass, pause, musicList} = this.state

    if (
      index + 1 === musicList.length &&
      activeSongClass + 1 === musicList.length
    ) {
      this.playerRef.pause()
      this.setState({pause: !pause})
    } else {
      this.setState(
        {
          index: index + 1,
          activeSongClass: activeSongClass + 1,
        },
        this.updatePlayer,
      )
    }
  }

  playOrPause = () => {
    const {musicList, index, pause} = this.state
    const currentSong = musicList[index]
    const audio = new Audio(currentSong.audio)
    console.log(audio)

    if (!pause) {
      this.playerRef.play()
    } else {
      this.playerRef.pause()
    }
    this.setState({
      pause: !pause,
    })
  }

  updatePlayer = () => {
    const {musicList, index, pause} = this.state

    const currentSong = musicList[index]
    const audio = new Audio(currentSong.audio)
    console.log(audio)
    this.playerRef.load()

    if (pause) {
      this.playerRef.play()
    } else {
      this.playerRef.pause()
    }
  }

  timeUpdate = () => {
    const {currentTime} = this.playerRef

    const inMins = Math.floor(currentTime / 60)
    const inSecs = Math.floor(currentTime % 60)
    const progress =
      100 * (this.playerRef.currentTime / this.playerRef.duration)

    if (inSecs < 10) {
      this.setState({currTime: `${inMins}:0${inSecs}`, seek: progress})
    } else {
      this.setState({currTime: `${inMins}:${inSecs}`, seek: progress})
    }
  }

  formatTime = secs => {
    const inMins = Math.floor(secs / 60)
    const inSecs = Math.floor(secs % 60)

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  onClickSelectSong = indx => {
    this.setState(
      {
        index: indx,
        activeSongClass: indx,
        pause: true,
      },
      this.updatePlayer,
    )
  }

  changeCurrTime = () => {
    const {seek} = this.state
    this.playerRef.currentTime = (this.playerRef.duration * seek) / 100
  }

  adjustVolume = () => {
    const {volume} = this.state
    this.playerRef.volume = volume / 10
  }

  changeSeekSlider = event => {
    this.setState({seek: event.target.value}, this.changeCurrTime)
  }

  changeVolumeSlider = event => {
    this.setState({volume: event.target.value}, this.adjustVolume)
  }

  renderMusicControlsMobileView = () => {
    const {musicList, index, pause} = this.state
    const currentSong = musicList[index]
    const {albumImage, albumArtist} = this.getAlbumImageArtist(currentSong)

    return (
      <>
        <audio
          ref={ref => {
            this.playerRef = ref
          }}
        >
          <source src={currentSong.previewUrl} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>
        <img src={albumImage} alt="album" className="album-img" />
        <div className="album-info">
          <p className="album-name">{currentSong.name}</p>
          <div className="artist-div">
            <span className="artist-name">{albumArtist}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={this.prevSong}
          className="next-prev-button"
        >
          <BsSkipBackward className="next-prev-icon" />
        </button>
        <button
          type="button"
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <FiPlay className="play-pause-icon" />
          ) : (
            <FiPause className="play-pause-icon" />
          )}
        </button>
        <button
          type="button"
          onClick={this.nextSong}
          className="next-prev-button"
        >
          <BsSkipForward className="next-prev-icon" />
        </button>
      </>
    )
  }

  renderMusicControlsDesktopView = () => {
    const {musicList, index, pause, currTime, seek, volume} = this.state

    const currentSong = musicList[index]
    const {durationMs} = currentSong

    const {albumImage, albumArtist} = this.getAlbumImageArtist(currentSong)

    return (
      <>
        <audio
          ref={ref => {
            this.playerRef = ref
          }}
        >
          <source src={currentSong.previewUrl} type="audio/mp3" />
          <track kind="captions" srcLang="en" />
        </audio>
        <img src={albumImage} alt="album" className="album-img" />
        <div className="album-info">
          <p className="album-name">{currentSong.name}</p>
          <div className="artist-div">
            <span className="artist-name">{albumArtist}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={this.prevSong}
          className="next-prev-button"
        >
          <BsSkipBackward className="next-prev-icon" />
        </button>
        <button
          type="button"
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <FiPlay className="play-pause-icon" />
          ) : (
            <FiPause className="play-pause-icon" />
          )}
        </button>
        <button
          type="button"
          onClick={this.nextSong}
          className="next-prev-button"
        >
          <BsSkipForward className="next-prev-icon" />
        </button>
        <span className="time-update">
          {this.formatTime(durationMs / 1000)}
        </span>
        <input
          type="range"
          className="seek-slider"
          value={seek}
          onChange={this.changeSeekSlider}
          max="100"
        />
        <span className="time-update">{currTime}</span>
        <BiVolumeFull className="volume-icon" />
        <input
          type="range"
          max="10"
          value={volume}
          className="volume-slider"
          onChange={this.changeVolumeSlider}
        />
      </>
    )
  }

  renderSongsList = () => {
    const {musicList, activeSongClass, displayInfo} = this.state

    return (
      <>
        {musicList.map((item, key = 0) => (
          <SongItem
            songData={item}
            displayInfo={displayInfo}
            selectSong={this.onClickSelectSong}
            isActive={activeSongClass === key}
            index={key}
            key={key}
          />
        ))}
      </>
    )
  }

  render() {
    const {displayInfo, section, screenSize} = this.state

    return (
      <div className="player-container">
        {screenSize >= 768 && <NavBar />}
        <BackNavigation />
        <div className="playlist-container">
          <AlbumDisplayInfo displayInfo={displayInfo} section={section} />
          {screenSize >= 768 && (
            <div id="columns-row" style={{width: '95%'}}>
              <span id="column-name">Track</span>
              <span id="column-name">Album</span>
              <span id="column-name">Time</span>
              <span id="column-name">Artist</span>
              <span id="column-name">Added</span>
            </div>
          )}
          <ul className="playlist">{this.renderSongsList()}</ul>
        </div>
        <div className="music-controls">
          {screenSize >= 768
            ? this.renderMusicControlsDesktopView()
            : this.renderMusicControlsMobileView()}
        </div>
      </div>
    )
  }
}

export default Player
