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
    // console.log(history)

    history.replace('/')
  }

  onClickRenderMenuButton = () => (
    <nav className="top-bar-container">
      <button
        type="button"
        onClick={this.onClickRedirectHome}
        className="menu-button"
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
        className="menu-button"
      >
        <FiMenu className="menu-icon" />
      </button>
    </nav>
  )

  onClickRenderMenuOptions = () => (
    <nav className="nav-links-container">
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
        className="menu-button"
      >
        <IoClose className="close-icon" />
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

export default withRouter(NavBar)
