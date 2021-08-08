import {Link} from 'react-router-dom'
import './index.css'

const PlayListItem = props => {
  const {playListItem} = props
  const {id, name, images, tracks} = playListItem

  const image = images.reduce((prev, curr) =>
    prev.height < curr.height ? prev : curr,
  )

  return (
    <Link to={`/your-playlists/${id}`}>
      <li className="play-list-item">
        <img
          src={image ? image.url : null}
          alt="album"
          className="item-image"
        />
        <div className="item-info">
          <p className="item-name">Playlist - {name}</p>
          <p className="tracks">{tracks ? tracks.total : 'N/A'} Tracks</p>
        </div>
      </li>
    </Link>
  )
}

export default PlayListItem
