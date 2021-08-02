import './index.css'

const AlbumDisplayInfo = props => {
  const {displayInfo} = props
  const {images, name} = displayInfo
  console.log(displayInfo, 'albumInfo')

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
    <div className="album-display-info">
      <img src={image} alt="" className="album-display-image" />
      <h1 className="album-display-name">{name}</h1>
    </div>
  )
}

export default AlbumDisplayInfo
