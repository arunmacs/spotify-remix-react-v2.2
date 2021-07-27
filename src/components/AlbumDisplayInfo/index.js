import './index.css'

const AlbumDisplayInfo = props => {
  const {playListInfo} = props
  console.log(playListInfo)

  return (
    <div className="specific-item-info">
      <img src={playListInfo.images} alt="" className="specific-item-image" />
      <h1 className="specific-item-name">{playListInfo.name}</h1>
    </div>
  )
}

export default AlbumDisplayInfo
