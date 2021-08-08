import {Component} from 'react'
import {FiSearch} from 'react-icons/fi'
// import LoaderView from '../LoaderView'
// import Player from '../Player'
import SongItem from '../SongItem'
import SearchPlaylistItem from '../SearchPlaylistItem'
import NavBar from '../NavBar'
import BackNavigation from '../BackNavigation'
import './index.css'
import LoaderView from '../LoaderView'

// const searchStatus = {
//   initial: 'INITIAL',
//   inProgress: 'INPROGRESS',
//   success: 'SUCCESS',
//   error: 'ERROR',
// }

class Search extends Component {
  state = {
    searchPlaylistData: [],
    searchTracksData: [],
    searchInput: 'telugu',
    // searchStatus: searchStatus.initial,
    isLoading: false,
    screenSize: window.innerWidth,
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token')
    return token
  }

  fetchSearchResults = async event => {
    event.preventDefault()
    this.setState({isLoading: true})
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
        searchPlaylistData: updatedPlaylist,
        searchTracksData: updatedTracksData,
        // searchStatus: searchStatus.success,
        isLoading: false,
      })
    }
  }

  setInputValue = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchResults = () => {
    const {searchPlaylistData, searchTracksData} = this.state
    // console.log(searchTracksData, 'tracks')

    return (
      <>
        <div className="search-playlist-container">
          <h1 className="content-name">Playlists</h1>
          <ul className="playlist-content">
            {searchPlaylistData.map(item => (
              <SearchPlaylistItem playlistItem={item} key={item.id} />
            ))}
          </ul>
        </div>
        <div className="search-tracks-container">
          <h1 className="content-name">Songs</h1>
          <ul className="songs-content">
            {searchTracksData.map(item => (
              <SongItem songData={item} key={item.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderSearchView = () => {
    const {searchInput, isLoading} = this.state

    return (
      <>
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
        <div className="search-results-container">
          {isLoading ? <LoaderView /> : this.renderSearchResults()}
        </div>
      </>
    )
  }

  render() {
    const {screenSize} = this.state

    return (
      <div className="search-body">
        {screenSize >= 768 ? <NavBar /> : ''}
        <BackNavigation />
        <div className="search-container">{this.renderSearchView()}</div>
        {/* <Player /> */}
      </div>
    )
  }
}

export default Search
