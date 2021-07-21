import {Component} from 'react'
import moment from 'moment'
import EditorsPicks from '../EditorsPicks'
import GenresAndMoods from '../GenresAndMoods'
import NewReleases from '../NewReleases'
import NavBar from '../NavBar'

import './index.css'

class SpotifyClone extends Component {
  state = {
    editorsPickData: [],
    genresAndMoodsData: [],
    newReleasesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getEditorsPickData()
    this.getGenreAndMoodsData()
    this.getNewReleasesData()
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token', '')
    return token
  }

  getTimeStamp = () => {
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    return timestamp
  }

  getEditorsPickData = async () => {
    const token = this.getAccessToken()
    const timeStamp = this.getTimeStamp()
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

    const editorsPickApiUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timeStamp}`
    const editorsPickOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(editorsPickApiUrl, editorsPickOptions)

    if (response.ok === true) {
      const data = await response.json()
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

      this.setState({editorsPickData: updatedData, isLoading: false})
    }
  }

  getGenreAndMoodsData = async () => {
    const token = this.getAccessToken()

    const categoryApiUrl = 'https://api.spotify.com/v1/browse/categories'

    const categoryOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(categoryApiUrl, categoryOptions)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.categories.items.map(item => ({
        href: item.href,
        id: item.id,
        icons: item.icons,
        name: item.name,
      }))

      this.setState({genresAndMoodsData: updatedData, isLoading: false})
    }
  }

  getNewReleasesData = async () => {
    const token = this.getAccessToken()

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

    const newReleasesApiUrl = `https://api.spotify.com/v1/browse/new-releases?country=${country}`
    const newReleasesOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(newReleasesApiUrl, newReleasesOptions)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.albums.items.map(item => ({
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        albumType: item.album_type,
        availableMarkets: item.available_markets,
        artists: item.artists,
        externalUrls: item.external_urls,
        releaseDate: item.release_date,
        releaseDatePrecision: item.release_date_precision,
        totalTracks: item.total_tracks,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({newReleasesData: updatedData, isLoading: false})
    }
  }

  renderEditorsPicksList = () => {
    const {editorsPickData} = this.state

    return (
      <>
        <h1 className="playlist-name">Editor&apos;s picks</h1>
        <div className="editor-container">
          {editorsPickData.map(item => (
            <EditorsPicks editorsPicksData={item} key={item.id} />
          ))}
        </div>
      </>
    )
  }

  renderGenresAndMoodList = () => {
    const {genresAndMoodsData} = this.state

    return (
      <>
        <h1 className="playlist-name">Genres & Moods</h1>
        <div className="genres-moods-container">
          {genresAndMoodsData.map(item => (
            <GenresAndMoods genresAndMoodsData={item} key={item.id} />
          ))}
        </div>
      </>
    )
  }

  renderNewReleasesList = () => {
    const {newReleasesData} = this.state

    return (
      <>
        <h1 className="playlist-name">New Releases</h1>
        <div className="new-releases-container">
          {newReleasesData.map(item => (
            <NewReleases newReleasesData={item} key={item.id} />
          ))}
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-div">
      <img src="/img/music.svg" alt="music-spectrum" className="loader" />
      <h1 className="loader-text">Loading...</h1>
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-body">
        <NavBar />
        <div className="main-container">
          {this.renderEditorsPicksList()}
          {this.renderGenresAndMoodList()}
          {this.renderNewReleasesList()}
        </div>
      </div>
    )
  }
}

export default SpotifyClone
