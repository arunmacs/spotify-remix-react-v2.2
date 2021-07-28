import {Link} from 'react-router-dom'
import './index.css'

const GenresAndMoods = props => {
  const {genresAndMoodsData} = props
  const {icons, name, id} = genresAndMoodsData

  return (
    <Link to={`/genre/${id}`}>
      <div className="genres-moods-item">
        <img src={icons[0].url} alt="" className="genres-moods-item-image" />
        <p className="genres-moods-item-name">{name}</p>
      </div>
    </Link>
  )
}

export default GenresAndMoods
