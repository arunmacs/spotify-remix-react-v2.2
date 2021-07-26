import {Link} from 'react-router-dom'

import './index.css'

const EditorsPicks = props => {
  const {editorsPicksData} = props
  const {name, id, images} = editorsPicksData

  return (
    <Link to={`/editor-pick/${id}`}>
      <div className="editors-picks-item">
        <img src={images[0].url} alt="" className="editor-pick-item-image" />
        <p className="editor-pick-item-name">{name}</p>
      </div>
    </Link>
  )
}

export default EditorsPicks
