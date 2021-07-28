import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsFillPersonFill, BsMusicNoteList} from 'react-icons/bs'
import {FiSearch} from 'react-icons/fi'
import {IoMdHome} from 'react-icons/io'
import {IoMusicalNotesSharp} from 'react-icons/io5'

import './index.css'

class NavBar extends Component {
  state = {showMenu: false, activeIconClass: 'active-tab'}

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
