import {Link} from 'react-router-dom'

import './index.css'

const EditorsPicks = props => {
  const {editorsPicksData} = props
  const {name, id, images} = editorsPicksData

  const image = images.reduce((prev, curr) =>
    prev.height < curr.height ? prev : curr,
  )
  //   console.log(image, 'image')

  return (
    <Link to={`/editor-pick/${id}`}>
      <div className="editor-picks-item">
        <img src={image.url} alt="" className="editor-pick-image" />
        <p className="editor-pick-name">{name}</p>
      </div>
    </Link>
  )
}

export default EditorsPicks
