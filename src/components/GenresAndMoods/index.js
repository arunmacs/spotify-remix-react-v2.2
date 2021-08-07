import {Link} from 'react-router-dom'

import './index.css'

const GenresAndMoods = props => {
  const {genresAndMoodsData} = props
  const {icons, name, id} = genresAndMoodsData

  const categoryId = id

  let icon

  if (icons !== undefined) {
    icon = icons.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
    icon = icon.url
  } else {
    icon = null
  }

  return (
    <Link to={`/genre/${categoryId}`}>
      <div className="genres-moods-item">
        <img src={icon} alt="" className="genres-moods-item-image" />
        <p className="genres-moods-item-name">{name}</p>
      </div>
    </Link>
  )
}

export default GenresAndMoods
