import {Link} from 'react-router-dom'
import './index.css'

const NewReleases = props => {
  const {newReleasesData} = props
  const {images, id, name} = newReleasesData

  return (
    <Link to={`/new-releases/album/${id}`}>
      <div className="new-releases-item">
        <img src={images[0].url} alt="" className="new-release-item-image" />
        <p className="new-release-item-name">{name}</p>
      </div>
    </Link>
  )
}

export default NewReleases
