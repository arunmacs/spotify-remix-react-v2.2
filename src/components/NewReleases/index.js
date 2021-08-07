import {Link} from 'react-router-dom'
import './index.css'

const NewReleases = props => {
  const {newReleasesData} = props
  const {images, id, name} = newReleasesData

  let image

  if (images !== undefined) {
    image = images.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
  } else {
    image = null
  }

  return (
    <Link to={`/new-releases/album/${id}`}>
      <div className="new-release-item">
        <img
          src={image.url}
          alt="nw-rls-albm"
          className="new-release-item-image"
        />
        <p className="new-release-item-name">{name}</p>
      </div>
    </Link>
  )
}

export default NewReleases
