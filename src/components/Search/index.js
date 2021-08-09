import {Component} from 'react'
import {FiSearch} from 'react-icons/fi'
import SearchTrackItem from '../SearchTrackItem'
import SearchPlaylistItem from '../SearchPlaylistItem'
import NavBar from '../NavBar'
import BackNavigation from '../BackNavigation'
import LoaderView from '../LoaderView'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    searchPlaylistData: [],
    searchTracksData: [],
    searchInput: '',
    playlistsStatus: apiStatus.initial,
    tracksStatus: apiStatus.initial,
    screenSize: window.innerWidth,
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token')
    return token
  }

  fetchSearchResults = async event => {
    this.setState({
      playlistsStatus: apiStatus.inProgress,
      tracksStatus: apiStatus.inProgress,
    })
    event.preventDefault()
    const {searchInput} = this.state
    const token = this.getAccessToken()

    const searchApiUrl = `https://api.spotify.com/v1/search?type=track,playlist&q=${searchInput}&market=from_token`
    const searchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(searchApiUrl, searchOptions)

    if (response.ok) {
      const data = await response.json()

      if (data.playlists.total !== 0) {
        const updatedPlaylist = data.playlists.items.map(item => ({
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
          searchPlaylistData: updatedPlaylist,
          playlistsStatus: apiStatus.success,
        })
      } else {
        this.setState({
          playlistsStatus: apiStatus.failure,
        })
      }

      if (data.tracks.total !== 0) {
        const updatedTracksData = data.tracks.items.map(item => ({
          album: item.album,
          artists: item.artists,
          discNumber: item.disc_number,
          durationMs: item.duration_ms,
          explicit: item.explicit,
          externalIds: item.external_ids,
          externalUrls: item.external_urls,
          href: item.href,
          id: item.id,
          isLocal: item.is_local,
          isPlayable: item.is_playable,
          name: item.name,
          popularity: item.popularity,
          previewUrl: item.preview_url,
          trackNumber: item.track_number,
          type: item.type,
          uri: item.uri,
        }))

        this.setState({
          searchTracksData: updatedTracksData,
          tracksStatus: apiStatus.success,
        })
      } else {
        this.setState({
          tracksStatus: apiStatus.failure,
        })
      }
    }
  }

  setInputValue = event => {
    this.setState({searchInput: event.target.value})
  }

  renderPlaylistsResults = () => {
    const {searchPlaylistData} = this.state

    return (
      <div className="search-playlist-container">
        <h1 className="content-name">Playlists</h1>
        <ul className="playlist-content">
          {searchPlaylistData.map(item => (
            <SearchPlaylistItem playlistItem={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderTracksResults = () => {
    const {searchTracksData} = this.state

    return (
      <div className="search-tracks-container">
        <h1 className="content-name">Songs</h1>
        <ul className="tracks-content">
          {searchTracksData.map(item => (
            <SearchTrackItem trackData={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  getPlaylists = () => {
    const {playlistsStatus} = this.state

    switch (playlistsStatus) {
      case apiStatus.inProgress:
        return <LoaderView />
      case apiStatus.success:
        return this.renderPlaylistsResults()
      case apiStatus.failure:
        return this.noResultsFoundView()
      default:
        return null
    }
  }

  getTracksLists = () => {
    const {tracksStatus} = this.state

    switch (tracksStatus) {
      case apiStatus.inProgress:
        return <LoaderView />
      case apiStatus.success:
        return this.renderTracksResults()
      case apiStatus.failure:
        return this.noResultsFoundView()
      default:
        return null
    }
  }

  noResultsFoundView = () => {
    const {searchInput} = this.state

    return (
      <div className="no-results-container">
        <h1 className="no-result-text">
          No results found for {`${searchInput}`}
        </h1>
        <p className="no-result-description">
          Please make sure your words are spelled correctly or use less or
          different keywords.
        </p>
      </div>
    )
  }

  renderSearchView = () => {
    const {searchInput} = this.state

    return (
      <>
        <div className="form-input-container">
          <form className="input-container" onSubmit={this.fetchSearchResults}>
            <FiSearch className="search-icon" />
            <input
              type="search"
              value={searchInput}
              name="search"
              onChange={this.setInputValue}
              placeholder="Try Search ?"
            />
          </form>
        </div>
        <div className="search-results-container">
          {this.getPlaylists()}
          {this.getTracksLists()}
        </div>
      </>
    )
  }

  render() {
    const {screenSize} = this.state

    return (
      <div className="search-body">
        {screenSize >= 768 && <NavBar />}
        <BackNavigation />
        <div className="search-container">{this.renderSearchView()}</div>
      </div>
    )
  }
}

export default Search
