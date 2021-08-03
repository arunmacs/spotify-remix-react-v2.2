import {Component} from 'react'
import LoaderView from '../LoaderView'
import BackNavigation from '../BackNavigation'
import GenreCategoryItem from '../GenreCategoryItem'
import './index.css'

class GenreCategory extends Component {
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
    const {categoryId} = params

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

    const genreListApiUrl = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=${country}`
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
        collaborative: item.collaborative,
        description: item.description,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        owner: item.owner,
        primaryColor: item.primary_color,
        public: item.public,
        snapshotId: item.snapshot_id,
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
    // console.log(genreListData)

    return (
      <>
        <h1 className="category-heading">Podcast</h1>
        <ul className="genre-list-container">
          {genreListData.map(item => (
            <GenreCategoryItem genreListItem={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <BackNavigation />
        <div className="genre-category-container">
          {isLoading ? <LoaderView /> : this.renderPage()}
        </div>
      </>
    )
  }
}

export default GenreCategory
