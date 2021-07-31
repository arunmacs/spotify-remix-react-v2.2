import {Component} from 'react'
// import MusicPlayer from '../MusicPlayer'
import SongItem from '../SongItem'
import AlbumDisplayInfo from '../AlbumDisplayInfo'
import BackNavigation from '../BackNavigation'
import LoaderView from '../LoaderView'
import './index.css'

class PlayListAlbum extends Component {
  state = {
    playlistData: [],
    playlistInfo: {},
    playingSong: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getSpecificItem()
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token', '')
    return token
  }

  getSpecificItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = this.getAccessToken()
    const specificItemApiUrl = `https://api.spotify.com/v1/users/spotify/playlists/${id}`

    const specificItemOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(specificItemApiUrl, specificItemOptions)

    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)

      const updatedPlaylistAlbumInfo = {
        collaborative: data.collaborative,
        description: data.description,
        externalUrls: data.external_urls,
        href: data.href,
        id: data.id,
        images: data.images,
        name: data.name,
        owner: data.owner,
        primaryColor: data.primary_color,
        public: data.public,
        snapshotId: data.snapshot_id,
        // tracks: data.tracks,
        type: data.type,
        uri: data.uri,
      }

      //   console.log(updatedPlaylistAlbumInfo)

      const updatedPlaylistData = data.tracks.items.map(item => ({
        album: item.track.album,
        artists: item.track.artists,
        availableMarkets: item.track.available_markets,
        discNumber: item.track.disc_number,
        durationMs: item.track.duration_ms,
        episode: item.track.episode,
        explicit: item.track.explicit,
        externalIds: item.track.external_ids,
        externalUrls: item.track.external_urls,
        href: item.track.href,
        id: item.track.id,
        isLocal: item.track.is_local,
        name: item.track.name,
        popularity: item.track.popularity,
        previewUrl: item.track.preview_url,
        track: item.track.track,
        trackNumber: item.track.track_number,
        type: item.track.type,
        uri: item.track.uri,
      }))

      //   console.log(updatedPlaylistData)

      this.setState({
        playlistData: updatedPlaylistData,
        playlistInfo: updatedPlaylistAlbumInfo,
        isLoading: false,
      })
    }
  }

  onClickPlaySong = url => {
    // console.log(url)
    this.setState({playingSong: url})
  }

  renderSongsList = () => {
    const {playlistData} = this.state

    return (
      <>
        {playlistData.map(item => (
          <SongItem
            songData={item}
            selectSong={this.onClickPlaySong}
            key={item.id}
          />
        ))}
      </>
    )
  }

  renderPage = () => {
    const {playlistInfo, playingSong} = this.state
    console.log(playingSong)

    return (
      <>
        <div className="playlist-item-container">
          <AlbumDisplayInfo playListInfo={playlistInfo} />
          <ul className="playlist-item-list">{this.renderSongsList()}</ul>
        </div>
        {/* <MusicPlayer songUrl={playingSong} /> */}
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="playlist-main-item-container">
        <BackNavigation />
        {isLoading ? <LoaderView /> : this.renderPage()}
      </div>
    )
  }
}

export default PlayListAlbum
