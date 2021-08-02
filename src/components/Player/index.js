import React from 'react'
import {BsFillPlayFill, BsPauseFill} from 'react-icons/bs'
import BackNavigation from '../BackNavigation'
import AlbumDisplayInfo from '../AlbumDisplayInfo'
import SongItem from '../SongItem'

import './index.css'

class Player extends React.Component {
  state = {...this.props, index: 0, pause: false, activeSong: null}

  componentDidMount() {
    // console.log('DidMount - Music')

    this.playerRef.addEventListener('timeupdate', this.timeUpdate, false)
    // this.playerRef.addEventListener('ended', this.nextSong, false)
    // this.timelineRef.addEventListener('click', this.changeCurrentTime, false)
    // this.timelineRef.addEventListener('mousemove', this.hoverTimeLine, false)
    // this.timelineRef.addEventListener('mouseout', this.resetTimeLine, false)
  }

  componentWillUnmount() {
    // console.log('WillUnMount - Music')

    this.playerRef.removeEventListener('timeupdate', this.timeUpdate)
    // this.playerRef.removeEventListener('ended', this.nextSong)
    // this.timelineRef.removeEventListener('click', this.changeCurrentTime)
    // this.timelineRef.removeEventListener('mousemove', this.hoverTimeLine)
    // this.timelineRef.removeEventListener('mouseout', this.resetTimeLine)
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
      image = null
    }

    if (artists !== undefined) {
      artist = artists[0].name
    } else {
      artist = 'Artist'
    }

    // console.log(image, artist)

    return {albumImage: image, albumArtist: artist}
  }

  updateActiveSongClass = id => {
    this.setState({activeSong: id})
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
    const {musicList, index} = this.state
    const currentSong = musicList[index]
    const audio = new Audio(currentSong.audio)
    console.log(audio)

    this.playerRef.load()
  }

  onClickSelectSong = indx => {
    const {pause} = this.state

    this.setState({
      index: indx,
    })

    this.updatePlayer()
    if (pause) {
      this.playerRef.play()
    }
  }

  renderMusicControls = () => {
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
            {/* {artists.map(item => (
            
          ))} */}
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

  renderSongsList = () => {
    const {musicList, activeSong} = this.state
    // console.log(musicList, 'musicList')

    return (
      <>
        {musicList.map((item, key = 0) => (
          <SongItem
            songData={item}
            selectSong={this.onClickSelectSong}
            updateActiveSongClass={this.updateActiveSongClass}
            isActive={activeSong === key}
            index={key}
            key={key}
          />
        ))}
      </>
    )
  }

  render() {
    const {displayInfo} = this.state
    // console.log('Render')

    return (
      <div className="player-container">
        <BackNavigation />
        <div className="playlist-container">
          <AlbumDisplayInfo displayInfo={displayInfo} />
          <ul className="playlist">{this.renderSongsList()}</ul>
        </div>
        <div className="music-controls">{this.renderMusicControls()}</div>
      </div>
    )
  }
}

export default Player
