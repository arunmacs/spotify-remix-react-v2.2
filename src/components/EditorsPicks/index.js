import {Link} from 'react-router-dom'

import './index.css'

const EditorsPicks = props => {
  const {editorsPickData} = props
  const {name, id, images} = editorsPickData

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
    <Link to={`/editor-pick/${id}`}>
      <div className="editor-pick-item">
        <img src={image} alt="" className="editor-pick-item-image" />
        <p className="editor-pick-item-name">{name}</p>
      </div>
    </Link>
  )
}

export default EditorsPicks
