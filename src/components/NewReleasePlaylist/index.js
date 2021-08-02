import {Component} from 'react'
// import BackNavigation from '../BackNavigation'
// import SongItem from '../SongItem'
// import AlbumDisplayInfo from '../AlbumDisplayInfo'
import LoaderView from '../LoaderView'
import Player from '../Player'

import './index.css'

class NewReleasePlaylist extends Component {
  state = {
    musicList: [],
    displayInfo: {},
    // playingSong: {},
    isLoading: true,
    // pause: false,
  }

  componentDidMount() {
    this.newReleasePlaylist()
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token', '')
    return token
  }

  newReleasePlaylist = async () => {
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
        musicList: updatedData,
        displayInfo: updatedInfo,
        // playingSong: updatedData[0],
        isLoading: false,
      })
    }
  }

  //   onClickPlaySong = song => {
  //     this.setState({playingSong: song})
  //   }

  //   playPauseStatus = () => {
  //     this.setState(prevState => ({pause: !prevState.pause}))
  //   }

  //   renderSongsList = () => {
  //     const {playlistData} = this.state

  //     return (
  //       <>
  //         {playlistData.map(item => (
  //           <SongItem
  //             songData={item}
  //             selectSong={this.onClickPlaySong}
  //             key={item.id}
  //           />
  //         ))}
  //       </>
  //     )
  //   }

  render() {
    const {isLoading, displayInfo, musicList} = this.state
    console.log(displayInfo, ' NewPlay')

    return (
      <div>
        {isLoading ? (
          <LoaderView />
        ) : (
          <Player
            displayInfo={displayInfo}
            musicList={musicList}
            // playingSong={playingSong}
          />
        )}
      </div>
    )
  }
}

export default NewReleasePlaylist
