import {Component} from 'react'
import MusicPlayer from '../MusicPlayer'
import SongItem from '../SongItem'
import AlbumDisplayInfo from '../AlbumDisplayInfo'
import BackNavigation from '../BackNavigation'
import './index.css'

class PlayListAlbum extends Component {
  state = {
    playlistData: [],
    playlistInfo: {},
    playingSong: {},
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

      const updatedInfo = {
        href: data.href,
        id: data.id,
        images: data.images[0].url,
        name: data.name,
        owner: data.owner,
        type: data.type,
        uri: data.uri,
      }

      const updatedData = data.tracks.items.map(item => ({
        album: item.track.album,
        artists: item.track.artists,
        discNumber: item.track.disc_number,
        durationMs: item.track.duration_ms,
        href: item.track.href,
        id: item.track.id,
        name: item.track.name,
        previewUrl: item.track.preview_url,
      }))

      this.setState({playlistData: updatedData, playlistInfo: updatedInfo})
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

  render() {
    const {playlistInfo, playingSong} = this.state

    return (
      <div className="playlist-main-item-container">
        <BackNavigation />
        <div className="playlist-item-container">
          <AlbumDisplayInfo playListInfo={playlistInfo} />
          <ul className="playlist-item-list">{this.renderSongsList()}</ul>
        </div>
        <MusicPlayer songUrl={playingSong} />
      </div>
    )
  }
}

export default PlayListAlbum
