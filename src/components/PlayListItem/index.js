import {Link} from 'react-router-dom'
import './index.css'

const PlayListItem = props => {
  const {playListItem} = props
  const {id, name, images, tracks} = playListItem

  return (
    <Link to={`/your-playlists/${id}`}>
      <li className="play-list-item">
        <img src={images[0].url} alt={`album `} className="item-image" />
        <div className="item-info">
          <p className="item-name"># Playlist - {name}</p>
          <p className="tracks">{tracks.total} Tracks</p>
        </div>
      </li>
    </Link>
  )
}

export default PlayListItem
