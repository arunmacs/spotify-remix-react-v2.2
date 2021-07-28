import {Component} from 'react'
import LoaderView from '../LoaderView'
import BackNavigation from '../BackNavigation'
import GenreListItem from '../GenreListItem'
import './index.css'

class GenreList extends Component {
  state = {genreListData: [], isLoading: true}

  componentDidMount() {
    this.getGenrePlayList()
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token', '')
    return token
  }

  getGenrePlayList = async () => {
    const token = this.getAccessToken()

    const {match} = this.props
    const {params} = match
    const {id} = params

    const userApiUrl = 'https://api.spotify.com/v1/me'
    const userOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const userDataResponse = await fetch(userApiUrl, userOptions)
    const userData = await userDataResponse.json()
    const {country} = userData

    const genreListApiUrl = `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${country}`
    const genreListOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(genreListApiUrl, genreListOptions)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)

      const updatedData = data.playlists.items.map(item => ({
        description: item.description,
        href: item.href,
        images: item.images,
        id: item.id,
        name: item.name,
        tracks: item.tracks,
        type: item.type,
        uri: item.uri,
      }))
      //   console.log(updatedData)

      this.setState({genreListData: updatedData, isLoading: false})
    }
  }

  renderPage = () => {
    const {genreListData} = this.state

    return (
      <>
        <h1 className="genre-name">Podcast</h1>
        <ul className="list-container">
          {genreListData.map(item => (
            <GenreListItem genreListItem={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="genre-list-container">
        <BackNavigation />
        {isLoading ? <LoaderView /> : this.renderPage()}
      </div>
    )
  }
}

export default GenreList
