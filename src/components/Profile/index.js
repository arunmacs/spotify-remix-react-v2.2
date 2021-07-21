import {Component} from 'react'
import NavBar from '../NavBar'

import './index.css'

class Profile extends Component {
  state = {userData: []}

  componentDidMount() {
    this.getUserProfileData()
  }

  onClickLogout = () => {
    localStorage.removeItem('pa_token')
    const {history} = this.props
    history.replace('/login')
  }

  getUserProfileData = async () => {
    const token = localStorage.getItem('pa_token', '')
    const apiUrl = 'https://api.spotify.com/v1/me'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedUserData = {
        displayName: data.display_name,
        country: data.country,
        email: data.email,
        explicitContent: data.explicit_content,
        externalUrls: data.external_urls,
        followers: data.followers,
        href: data.href,
        id: data.id,
        images: data.images,
        product: data.product,
        type: data.type,
        uri: data.uri,
      }
      this.setState({userData: updatedUserData})
    }
  }

  render() {
    const {userData} = this.state

    return (
      <>
        <NavBar />
        <div className="profile-container">
          <img src="/img/profile-user.svg" alt="user" className="user-icon" />
          <h1 className="user-name">{userData.displayName}</h1>
          <div className="followers-playlists-info-container">
            <div className="followers-playlists-div">
              <p className="followers-playlists-info">15</p>
              <p className="followers-playlists-info-text">FOLLOWERS</p>
            </div>
            <div className="followers-playlists-div">
              <p className="followers-playlists-info">30</p>
              <p className="followers-playlists-info-text">PLAYLISTS</p>
            </div>
          </div>
          <button
            type="button"
            onClick={this.onClickLogout}
            className="logout-button"
          >
            LOGOUT
          </button>
        </div>
      </>
    )
  }
}

export default Profile
