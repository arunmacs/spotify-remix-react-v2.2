import {Link, withRouter} from 'react-router-dom'
import './index.css'

const GenreCategoryItem = props => {
  const {genreListItem} = props
  const {images, name, tracks, id} = genreListItem

  const getCategoryId = () => {
    const {match} = props
    const {params} = match
    const {categoryId} = params
    return categoryId
  }

  let image

  if (images !== undefined) {
    image = images.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
    image = image.url
  } else {
    image = null
  }

  return (
    <Link to={`/genre/${getCategoryId()}/${id}/playlist`}>
      <li className="genre-album-container">
        <img
          src={image}
          height={60}
          alt="genre-album"
          className="genre-album-image"
        />
        <div className="genre-album-info">
          <p className="genre-album-name">{name}</p>
          <p className="genre-album-tracks">{tracks.total} Tracks</p>
        </div>
      </li>
    </Link>
  )
}

export default withRouter(GenreCategoryItem)
