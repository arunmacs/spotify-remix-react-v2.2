import moment from 'moment'

import './index.css'

const SongItem = props => {
  const {songData, selectSong, index, isActive} = props
  const {artists, album, durationMs, name} = songData

  //   console.log(songData)

  //   const added = album.release_date

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

  const getFormaDistance = added => {
    const addedAgo = moment(added, 'YYYYMMDD').fromNow()
    return addedAgo
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
      <div className="song-info-md">
        <p className="song-name">{name}</p>
        <div className="artists-div">
          <span className="song-artist">{artists[0].name}</span>
        </div>
      </div>
      <span className="song-duration-md">{getDurationTime(durationMs)}</span>
      <tr id="song-row">
        <td id="song-img">
          <img src={image} className="album-thumbnail-lg" alt="album-img" />
        </td>
        <td id="song-name">{name}</td>
        <td id="album-name">{album.name}</td>
        <td id="duration">{getDurationTime(durationMs)}</td>
        <td id="artist-name">
          <span>{artists[0].name}</span>
        </td>
        <td id="added">{getFormaDistance(album.release_date)}</td>
      </tr>
    </li>
  )
}

export default SongItem
