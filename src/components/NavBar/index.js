import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {BsFillPersonFill, BsMusicNoteList} from 'react-icons/bs'
import {FiSearch, FiMenu} from 'react-icons/fi'
import {IoMdHome} from 'react-icons/io'
import {IoMusicalNotesSharp, IoClose} from 'react-icons/io5'

import './index.css'

class NavBar extends Component {
  state = {showMenu: false}

  onClickToggleMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onClickRedirectHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  RenderMenuButton = () => (
    <>
      <nav className="top-navbar-container">
        <button
          type="button"
          onClick={this.onClickRedirectHome}
          className="logo-button"
        >
          <img
            src="/img/music.svg"
            alt="music-spectrum"
            className="music-spectrum-img"
          />
        </button>
        <button
          type="button"
          onClick={this.onClickToggleMenu}
          className="menu-close-button"
        >
          <FiMenu className="menu-icon" />
        </button>
      </nav>
      <nav className="side-navbar-container">
        <button
          type="button"
          onClick={this.onClickRedirectHome}
          className="logo-button"
        >
          <img
            src="/img/music.svg"
            alt="music-spectrum"
            className="music-spectrum-img"
          />
        </button>
        <div className="side-navbar-links">
          <Link to="/profile" key="profile" className="icon-container">
            <BsFillPersonFill className="menu-option" />
          </Link>

          <Link to="/" key="avatar" className="icon-container">
            <IoMdHome className="menu-option" />
          </Link>

          <Link to="/search" key="search" className="icon-container">
            <FiSearch className="menu-option" />
          </Link>

          <Link to="/your-music" key="yourMusic" className="icon-container">
            <IoMusicalNotesSharp className="menu-option" />
          </Link>

          <Link to="/playlists" key="yourPlaylist" className="icon-container">
            <BsMusicNoteList className="menu-option" />
          </Link>
        </div>
      </nav>
    </>
  )

  RenderMenuOptions = () => (
    <nav className="top-navbar-links">
      <Link to="/profile">
        <BsFillPersonFill className="menu-option" />
      </Link>
      <Link to="/">
        <IoMdHome className="menu-option" />
      </Link>
      <Link to="/search">
        <FiSearch className="menu-option" />
      </Link>
      <Link to="/your-music">
        <IoMusicalNotesSharp className="menu-option" />
      </Link>
      <Link to="/playlists">
        <BsMusicNoteList className="menu-option" />
      </Link>
      <button
        type="button"
        onClick={this.onClickToggleMenu}
        className="menu-close-button"
      >
        <IoClose className="close-icon" />
      </button>
    </nav>
  )

  render() {
    const {showMenu} = this.state

    return (
      <header className="navbar-container">
        {showMenu ? this.RenderMenuOptions() : this.RenderMenuButton()}
      </header>
    )
  }
}

export default withRouter(NavBar)
