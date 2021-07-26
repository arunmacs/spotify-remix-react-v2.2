import {Link} from 'react-router-dom'
import './index.css'

const GenresAndMoods = props => {
  const {genresAndMoodsData} = props
  const {icons, name} = genresAndMoodsData

  return (
    <div className="genres-moods-item">
      <img src={icons[0].url} alt="" className="genres-moods-item-image" />
      <p className="genres-moods-item-name">{name}</p>
    </div>
  )
}

export default GenresAndMoods
