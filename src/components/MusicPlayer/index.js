// import CardProfile from '../PlayerDevMode'
import './index.css'

const MusicPlayer = props => {
  const {songUrl} = props

  return (
    <div className="player-container">
      <audio
        autoPlay
        controls
        src={songUrl}
        style={{width: '100%', height: '56px'}}
        type="audio/mpeg"
      >
        <track kind="captions" srcLang="en" />
      </audio>
    </div>
  )
}

export default MusicPlayer
