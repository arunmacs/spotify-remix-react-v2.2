import moment from 'moment'

import './index.css'

const SongItem = props => {
  const {songData} = props
  console.log(songData)
  const {album, artists, durationMs, name} = songData
  //   let thumbNail

  //   if (album.images) {
  //     thumbNail = album.images.filter(img => img.height <= 64)
  //   } else {
  //     thumbNail = album.filter(img => img.height <= 64)
  //   }

  //   console.log(thumbNail)

  //   const onClickPlaySong = () => {}

  const getDurationTime = inMilliSecs => {
    const inSecs = moment.duration(inMilliSecs).seconds()
    const inMins = moment.duration(inMilliSecs).minutes()

    if (inSecs < 10) {
      return `${inMins}:0${inSecs}`
    }
    return `${inMins}:${inSecs}`
  }

  return (
    <li className="song-item">
      {/* <img
        src={thumbNail.url}
        alt="song thumbnail"
        className="song-thumbnail"
      /> */}
      <div className="song-info">
        <p className="song-name">{name}</p>
        <div className="artists-div">
          {artists.map(artist => (
            <span className="song-artist" key={artist.id}>
              {artist.name}
            </span>
          ))}
        </div>
      </div>
      <span className="song-duration">{getDurationTime(durationMs)}</span>
    </li>
  )
}

export default SongItem
