import moment from 'moment'

import './index.css'

const SongItem = props => {
  const {songData, selectSong, index, isActive} = props
  const {artists, album, durationMs, name} = songData

  //   console.log(isActive)

  const activeSongClass = isActive ? 'activeClass' : ''

  let image

  if (album !== undefined) {
    image = album.images.reduce((prev, curr) =>
      prev.height < curr.height ? prev : curr,
    )
    image = image.url
  } else {
    image = '/img/no-album-image.png'
  }

  const onClickSelectSong = () => {
    selectSong(index)
  }

  const getDurationTime = inMilliSecs => {
    const inSecs = moment.duration(inMilliSecs).seconds()
    const inMins = moment.duration(inMilliSecs).minutes()

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  return (
    <li className={`song-item ${activeSongClass}`} onClick={onClickSelectSong}>
      <img src={image} alt="album" className="song-thumbnail" />
      <div className="song-info">
        <p className="song-name">{name}</p>
        <div className="artists-div">
          <span className="song-artist">{artists[0].name}</span>
          {/* {artists.map(artist => (
            
          ))} */}
        </div>
      </div>
      <span className="song-duration">{getDurationTime(durationMs)}</span>
    </li>
  )
}

export default SongItem
