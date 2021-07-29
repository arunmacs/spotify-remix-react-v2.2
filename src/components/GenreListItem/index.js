import './index.css'

const GenreListItem = props => {
  const {genreListItem} = props
  //   console.log(genreListItem)

  return (
    <li className="genre-album-container">
      <img
        src="/img/person.svg"
        alt="genre-album"
        className="genre-album-image"
      />
      <div className="genre-album-info">
        <p className="genre-album-name">Hello</p>
        <p className="genre-album-tracks">Hello</p>
      </div>
    </li>
  )
}

export default GenreListItem
