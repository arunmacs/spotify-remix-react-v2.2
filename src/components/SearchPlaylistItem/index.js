import {Link} from 'react-router-dom'
import './index.css'

const SearchPlaylistItem = props => {
  const {playlistItem} = props

  const {id, name, images, tracks} = playlistItem

  const image = images.reduce((prev, curr) =>
    prev.height > curr.height ? prev : curr,
  )

  return (
    <Link to={`/search/playlists/${id}`}>
      <li className="search-list-item">
        <img
          src={image ? image.url : null}
          alt="album"
          className="search-item-image"
        />
        <div className="search-item-info">
          <p className="search-item-name">Playlist - {name}</p>
          <p className="search-tracks">
            {tracks ? tracks.total : 'N/A'} Tracks
          </p>
        </div>
      </li>
    </Link>
  )
}

export default SearchPlaylistItem
