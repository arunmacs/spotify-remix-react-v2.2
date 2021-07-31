import {Component} from 'react'
import moment from 'moment'
import LoaderView from '../LoaderView'
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
    isEditorPickSectionLoading: true,
    isGenreMoodSectionLoading: true,
    isNewReleaseSectionLoading: true,
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

      this.setState({
        editorsPickData: updatedData,
        isEditorPickSectionLoading: false,
      })
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
        icons: item.icons,
        id: item.id,
        name: item.name,
      }))

      this.setState({
        genresAndMoodsData: updatedData,
        isGenreMoodSectionLoading: false,
      })
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
      //   console.log(data)

      const updatedData = data.albums.items.map(item => ({
        albumType: item.album_type,
        artists: item.artists,
        availableMarkets: item.available_markets,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        releaseDate: item.release_date,
        releaseDatePrecision: item.release_date_precision,
        totalTracks: item.total_tracks,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({
        newReleasesData: updatedData,
        isNewReleaseSectionLoading: false,
      })
    }
  }

  renderEditorsPicksList = () => {
    const {editorsPickData} = this.state

    return (
      <>
        <h1 className="container-name">Editor&apos;s picks</h1>
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
        <h1 className="container-name">Genres & Moods</h1>
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
        <h1 className="container-name">New Releases</h1>
        <div className="new-releases-container">
          {newReleasesData.map(item => (
            <NewReleases newReleasesData={item} key={item.id} />
          ))}
        </div>
      </>
    )
  }

  renderHomeView = () => {
    const {
      isEditorPickSectionLoading,
      isGenreMoodSectionLoading,
      isNewReleaseSectionLoading,
    } = this.state

    return (
      <>
        {isEditorPickSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderEditorsPicksList()
        )}
        {isGenreMoodSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderGenresAndMoodList()
        )}
        {isNewReleaseSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderNewReleasesList()
        )}
      </>
    )
  }

  render() {
    return (
      <div className="app-body">
        <NavBar />
        <div className="main-container">{this.renderHomeView()}</div>
      </div>
    )
  }
}

export default SpotifyClone
