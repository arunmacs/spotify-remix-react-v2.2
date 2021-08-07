import {Component} from 'react'
import Player from '../Player'
import LoaderView from '../LoaderView'

import './index.css'

class YourMusic extends Component {
  state = {
    musicList: [],
    displayInfo: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getYourMusicPlayLists()
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token', '')
    return token
  }

  getYourMusicPlayLists = async () => {
    const token = this.getAccessToken()
    const yourMusicApiUrl = `https://api.spotify.com/v1/me/tracks`
    const yourMusicOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(yourMusicApiUrl, yourMusicOptions)
    if (response.ok === true) {
      const data = await response.json()

      const updatedMusicListData = data.items.map(item => ({
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

      this.setState({
        musicList: updatedMusicListData,
        isLoading: false,
      })
    } else {
      this.sessionTimedOut()
    }
  }

  sessionTimedOut = () => {
    const {history} = this.props
    localStorage.removeItem('pa_token')
    history.replace('/login')
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
            section="Your Music"
          />
        )}
      </div>
    )
  }
}

export default YourMusic
