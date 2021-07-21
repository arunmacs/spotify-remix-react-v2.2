import {Link} from 'react-router-dom'

import './index.css'

const EditorsPicks = props => {
  const {editorsPicksData} = props
  const {name, images} = editorsPicksData

  return (
    <div className="editors-picks-item">
      <img src={images[0].url} alt="" className="item-image" />
      <p className="item-name">{name}</p>
    </div>
  )
}

export default EditorsPicks
