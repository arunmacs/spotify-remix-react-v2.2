import {Link} from 'react-router-dom'
import './index.css'

const NewReleases = props => {
  const {newReleasesData} = props
  const {images, name} = newReleasesData

  return (
    <div className="new-releases-item">
      <img src={images[0].url} alt="" className="new-release-item-image" />
      <p className="new-release-item-name">{name}</p>
    </div>
  )
}

export default NewReleases
