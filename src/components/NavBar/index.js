import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class NavBar extends Component {
  state = {showMenu: false}

  onClickToggleMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onClickRenderMenuButton = () => (
    <nav className="top-bar-container">
      <img
        src="/img/music.svg"
        alt="music-spectrum"
        className="music-spectrum-img"
      />
      <button
        type="button"
        onClick={this.onClickToggleMenu}
        className="menu-button"
      >
        <img src="/img/menu.svg" alt="menu-icon" className="menu-icon" />
      </button>
    </nav>
  )

  onClickRenderMenuOptions = () => (
    <nav className="nav-links-container">
      <Link to="/profile">
        <img src="/img/person.svg" alt="person" className="menu-option" />
      </Link>
      <Link to="/">
        <img src="/img/home.svg" alt="home" className="menu-option" />
      </Link>
      <Link to="/your-music">
        <img src="/img/Solid.svg" alt="music" className="menu-option" />
      </Link>
      <Link to="/playlists">
        <img src="/img/queue_music.svg" alt="queue" className="menu-option" />
      </Link>
      <button
        type="button"
        onClick={this.onClickToggleMenu}
        className="menu-button"
      >
        <img src="/img/close.svg" alt="close" className="menu-icon" />
      </button>
    </nav>
  )

  render() {
    const {showMenu} = this.state

    return (
      <div className="nav-bar-container">
        {showMenu
          ? this.onClickRenderMenuOptions()
          : this.onClickRenderMenuButton()}
      </div>
    )
  }
}

export default NavBar
