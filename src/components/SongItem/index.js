import moment from 'moment'

import './index.css'

const SongItem = props => {
  const {songData, selectSong, index, isActive, displayInfo} = props
  const {artists, album, durationMs, name} = songData

  const activeSongClass = isActive && 'activeClass'

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
    <li className={`song-row ${activeSongClass}`} onClick={onClickSelectSong}>
      <img src={image} alt="album" className="song-thumbnail" />
      <div id="song-info">
        <div className="song-info-md">
          <span className="song-name-md">{name}</span>
          <span className="artist-name-md">
            {artists ? artists[0].name : 'Artist'}
          </span>
        </div>
        <span id="song-name">{name}</span>
        <span id="album-name">{album ? album.name : '(Album?)'}</span>
        <span id="duration">{getDurationTime(durationMs)}</span>
        <span id="artist-name">{artists ? artists[0].name : 'Artist'}</span>
        <span id="added">
          {album
            ? getFormaDistance(album.release_date)
            : getFormaDistance(displayInfo.releaseDate)}
        </span>
      </div>
    </li>
  )
}

export default SongItem
