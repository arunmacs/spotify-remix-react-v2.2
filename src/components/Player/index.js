import React from 'react'
import {BsFillPlayFill, BsPauseFill} from 'react-icons/bs'
import {BiVolumeFull} from 'react-icons/bi'
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
    screenSize: window.innerWidth,
  }

  componentDidMount() {
    // console.log('DidMount - Music')
    this.playerRef.addEventListener('timeupdate', this.timeUpdate)
    this.playerRef.addEventListener('ended', this.nextSong)
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    // console.log('WillUnMount - Music')
    this.playerRef.removeEventListener('timeupdate', this.timeUpdate)
    this.playerRef.removeEventListener('ended', this.nextSong)
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

  nextSong = () => {
    const {index, activeSongClass, pause, musicList} = this.state
    // console.log('NextSong', index, activeSongClass, pause, musicList)

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

  changeSeeker = event => {
    console.log(event.target.value)
  }

  changeVolume = event => {
    console.log(event.target.value)
  }

  renderMusicControlsMobileView = () => {
    const {musicList, index, pause, screenSize} = this.state
    console.log(screenSize)
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
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <BsFillPlayFill className="play-pause-icon" />
          ) : (
            <BsPauseFill className="play-pause-icon" />
          )}
        </button>
      </>
    )
  }

  renderMusicControlsDesktopView = () => {
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
          onClick={this.playOrPause}
          className="play-pause-button"
        >
          {!pause ? (
            <BsFillPlayFill className="play-pause-icon" />
          ) : (
            <BsPauseFill className="play-pause-icon" />
          )}
        </button>
        <span className="time-update">00:00</span>
        <input
          type="range"
          className="seek-slider"
          onChange={this.changeSeeker}
        />
        <BiVolumeFull className="volume-icon" />
        <input
          type="range"
          min="0"
          max="10"
          className="volume-slider"
          onChange={this.changeVolume}
        />
      </>
    )
  }

  renderSongsList = () => {
    const {musicList, activeSongClass} = this.state

    return (
      <>
        {musicList.map((item, key = 0) => (
          <SongItem
            songData={item}
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
    const {displayInfo, screenSize} = this.state

    return (
      <div className="player-container">
        {screenSize >= 768 && <NavBar />}
        <BackNavigation />
        <div className="playlist-container">
          <AlbumDisplayInfo displayInfo={displayInfo} />
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
