import moment from 'moment'

import './index.css'

const SearchTrackItem = props => {
  const {trackData, isActive} = props
  const {artists, album, durationMs, name} = trackData

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

  const getDurationTime = inMilliSecs => {
    const inSecs = moment.duration(inMilliSecs).seconds()
    const inMins = moment.duration(inMilliSecs).minutes()

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  return (
    <li className={`track-row ${activeSongClass}`}>
      <img src={image} alt="album" className="track-thumbnail" />
      <div className="track-info">
        <span className="track-name">{name}</span>
        <span className="track-artist-name">
          {artists ? artists[0].name : 'Artist'}
        </span>
        <span className="track-album-name">
          {album ? album.name : '(Album?)'}
        </span>
      </div>
      <span className="track-duration">{getDurationTime(durationMs)}</span>
    </li>
  )
}

export default SearchTrackItem
