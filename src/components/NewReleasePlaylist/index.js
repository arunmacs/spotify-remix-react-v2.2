import {Component} from 'react'
import BackNavigation from '../BackNavigation'
import SongItem from '../SongItem'
import AlbumDisplayInfo from '../AlbumDisplayInfo'
import MusicPlayer from '../MusicPlayer'

import './index.css'

class NewReleasePlaylist extends Component {
  state = {
    playlistData: [],
    playlistInfo: {},
    playingSong: {},
    pause: false,
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
    const specificItemApiUrl = `https://api.spotify.com/v1/albums/${id}`

    const specificItemOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(specificItemApiUrl, specificItemOptions)

    if (response.ok === true) {
      const data = await response.json()

      const updatedInfo = {
        albumType: data.album_type,
        artists: data.artists,
        availableMarkets: data.available_markets,
        copyrights: data.copyrights,
        externalIds: data.external_ids,
        externalUrls: data.external_urls,
        genres: data.genres,
        href: data.href,
        id: data.id,
        images: data.images,
        label: data.label,
        name: data.name,
        popularity: data.popularity,
        releaseDate: data.release_date,
        releaseDatePrecision: data.release_date_precision,
        totalTracks: data.total_tracks,
        // tracks: data.tracks,
        type: data.type,
        uri: data.uri,
      }

      //   console.log(data, 'data')

      const updatedData = data.tracks.items.map(item => ({
        artists: item.artists,
        availableMarkets: item.available_markets,
        discNumber: item.disc_number,
        durationMs: item.duration_ms,
        // episode: item.track.episode,
        explicit: item.explicit,
        // externalIds: item.track.external_ids,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        isLocal: item.is_local,
        name: item.name,
        // popularity: item.track.popularity,
        previewUrl: item.preview_url,
        // track: item.track.track,
        trackNumber: item.track_number,
        type: item.type,
        uri: item.uri,
      }))

      //   console.log(updatedData, 'updated')

      this.setState({
        playlistData: updatedData,
        playlistInfo: updatedInfo,
        playingSong: updatedData[0],
      })
    }
  }

  onClickPlaySong = song => {
    this.setState({playingSong: song})
  }

  playPauseStatus = () => {
    this.setState(prevState => ({pause: !prevState.pause}))
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

  render() {
    const {playingSong, playlistInfo, pause} = this.state
    // console.log(playingSong, 'new')

    return (
      <div className="new-release-album-container">
        <BackNavigation />
        <div className="new-release-album-playlist-container">
          <AlbumDisplayInfo playListInfo={playlistInfo} />
          <ul className="new-release-album-list">{this.renderSongsList()}</ul>
        </div>
        <MusicPlayer
          playingSong={playingSong}
          pause={pause}
          playPauseStatus={this.playPauseStatus}
        />
      </div>
    )
  }
}

export default NewReleasePlaylist
