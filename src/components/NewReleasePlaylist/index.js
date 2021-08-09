import {Component} from 'react'
import LoaderView from '../LoaderView'
import Player from '../Player'

import './index.css'

class NewReleasePlaylist extends Component {
  state = {
    musicList: [],
    displayInfo: {},
    isLoading: true,
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
        tracks: data.tracks,
        type: data.type,
        uri: data.uri,
      }

      const updatedData = data.tracks.items.map(item => ({
        artists: item.artists,
        availableMarkets: item.available_markets,
        discNumber: item.disc_number,
        durationMs: item.duration_ms,
        explicit: item.explicit,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        isLocal: item.is_local,
        name: item.name,
        previewUrl: item.preview_url,
        trackNumber: item.track_number,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({
        musicList: updatedData,
        displayInfo: updatedInfo,
        isLoading: false,
      })
    }
  }

  render() {
    const {isLoading, displayInfo, musicList} = this.state

    return (
      <div>
        {isLoading ? (
          <LoaderView />
        ) : (
          <Player
            displayInfo={displayInfo}
            musicList={musicList}
            section="New Releases"
          />
        )}
      </div>
    )
  }
}

export default NewReleasePlaylist
