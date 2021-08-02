import {Component} from 'react'
// import moment from 'moment'
// import NavBar from '../NavBar'
import Player from '../Player'
import LoaderView from '../LoaderView'

import './index.css'

class YourMusic extends Component {
  state = {
    musicList: [],
    displayInfo: {},
    // playingSong: {},
    isLoading: true,
    // pause: false,
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
      //   console.log(data)

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
      //   console.log(updatedData)

      this.setState({
        musicList: updatedMusicListData,
        isLoading: false,
      })
    } else {
      //   console.log('error')
      this.sessionTimedOut()
    }
  }

  sessionTimedOut = () => {
    const {history} = this.props
    // const token = this.getAccessToken()
    localStorage.removeItem('pa_token')

    history.replace('/login')
  }

  //   getDurationTime = inMilliSecs => {
  //     const inSecs = moment.duration(inMilliSecs).seconds()
  //     const inMins = moment.duration(inMilliSecs).minutes()

  //     if (inSecs < 10) {
  //       return `${inMins}:0${inSecs}`
  //     }
  //     return `${inMins}:${inSecs}`
  //   }

  //   renderYourMusicPlayLists = data => {
  //     const {album, name, id, artists, durationMs, previewUrl} = data

  //     this.onClickSelectSong = () => {
  //       this.setState({playingSong: previewUrl})
  //     }

  //     return (
  //       <li className="music-item" onClick={this.onClickSelectSong} key={id}>
  //         <img src={album.images[2].url} alt={`album `} className="item-image" />
  //         <div className="item-info">
  //           <p className="item-name">{name}</p>
  //           <div className="artist-div">
  //             {artists.map(artist => (
  //               <span className="item-artist" key={artist.id}>
  //                 {artist.name}
  //               </span>
  //             ))}
  //           </div>
  //         </div>
  //         <span className="item-duration">
  //           {this.getDurationTime(durationMs)}
  //         </span>
  //       </li>
  //     )
  //   }

  //   renderPage = () => {
  //     const {yourMusicPlayListData, playingSong} = this.state
  //     console.log(playingSong)

  //     return (
  //       <>
  //         <div className="your-music-main-container">
  //           <h1 className="playlist-name">Your Music</h1>
  //           <ul className="your-music-container">
  //             {yourMusicPlayListData.map(item =>
  //               this.renderYourMusicPlayLists(item),
  //             )}
  //           </ul>
  //         </div>
  //         {/* <MusicPlayer songUrl={playingSong} /> */}
  //       </>
  //     )
  //   }

  render() {
    const {isLoading, displayInfo, musicList} = this.state
    // console.log(displayInfo, ' editPlay')

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

export default YourMusic
