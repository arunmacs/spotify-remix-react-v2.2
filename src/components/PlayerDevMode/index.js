// import React from 'react'

// class PlayerDevMode extends React.Component {
//   state = {
//     index: 3,
//     currentTime: '0:00',
//     musicList: [
//       {
//         name: 'Nice piano and ukulele',
//         author: 'Royalty',
//         img: 'https://www.bensound.com/bensound-img/buddy.jpg',
//         audio: 'https://www.bensound.com/bensound-music/bensound-buddy.mp3',
//         duration: '2:02',
//       },
//       {
//         name: 'Gentle acoustic',
//         author: 'Acoustic',
//         img: 'https://www.bensound.com/bensound-img/sunny.jpg',
//         audio: 'https://www.bensound.com//bensound-music/bensound-sunny.mp3',
//         duration: '2:20',
//       },
//       {
//         name: 'Corporate motivational',
//         author: 'Corporate',
//         img: 'https://www.bensound.com/bensound-img/energy.jpg',
//         audio: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
//         duration: '2:59',
//       },
//       {
//         name: 'Slow cinematic',
//         author: 'Royalty',
//         img: 'https://www.bensound.com/bensound-img/slowmotion.jpg',
//         audio:
//           'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
//         duration: '3:26',
//       },
//     ],
//     pause: false,
//   }

//   componentDidMount() {
//     this.playerRef.addEventListener('timeupdate', this.timeUpdate, false)
//     this.playerRef.addEventListener('ended', this.nextSong, false)
//     this.timelineRef.addEventListener('click', this.changeCurrentTime, false)
//     this.timelineRef.addEventListener('mousemove', this.hoverTimeLine, false)
//     this.timelineRef.addEventListener('mouseout', this.resetTimeLine, false)
//   }

//   componentWillUnmount() {
//     this.playerRef.removeEventListener('timeupdate', this.timeUpdate)
//     this.playerRef.removeEventListener('ended', this.nextSong)
//     this.timelineRef.removeEventListener('click', this.changeCurrentTime)
//     this.timelineRef.removeEventListener('mousemove', this.hoverTimeLine)
//     this.timelineRef.removeEventListener('mouseout', this.resetTimeLine)
//   }

//   changeCurrentTime = e => {
//     const {duration} = this.playerRef

//     const playheadWidth = this.timelineRef.offsetWidth
//     const offsetWidth = this.timelineRef.offsetLeft
//     const userClickWidth = e.clientX - offsetWidth

//     const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth

//     this.playheadRef.style.Width = `${userClickWidthInPercent} + '%'`
//     this.playerRef.currentTime = (duration * userClickWidthInPercent) / 100
//   }

//   hoverTimeLine = e => {
//     const {duration} = this.playerRef

//     const playheadWidth = this.timelineRef.offsetWidth

//     const offsetWidth = this.timelineRef.offsetLeft
//     const userClickWidth = e.clientX - offsetWidth
//     const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth

//     if (userClickWidthInPercent <= 100) {
//       this.hoverPlayheadRef.style.Width = `${userClickWidthInPercent} + '%'`
//     }

//     const time = (duration * userClickWidthInPercent) / 100

//     if (time >= 0 && time <= duration) {
//       this.hoverPlayheadRef.dataset.content = this.formatTime(time)
//     }
//   }

//   resetTimeLine = () => {
//     this.hoverPlayheadRef.style.Width = 0
//   }

//   timeUpdate = () => {
//     const {duration} = this.playerRef
//     const timelineWidth =
//       this.timelineRef.offsetWidth - this.playheadRef.offsetWidth
//     const playPercent = 100 * (this.playerRef.currentTime / duration)
//     this.playheadRef.style.Width = `${playPercent} + '%'`
//     const currentTime = this.formatTime(
//       parseInt(this.playerRef.currentTime, 10),
//     )
//     this.setState({
//       currentTime,
//     })
//   }

//   formatTime = currentTime => {
//     const minutes = Math.floor(currentTime / 60)
//     let seconds = Math.floor(currentTime % 60)

//     seconds = seconds >= 10 ? seconds : `0${seconds % 60}`

//     const formatTime = `${minutes}:${seconds}`

//     return formatTime
//   }

//   updatePlayer = () => {
//     const {musicList, index} = this.state
//     const currentSong = musicList[index]
//     const audio = new Audio(currentSong.audio)
//     this.playerRef.load()
//   }

//   nextSong = () => {
//     const {musicList, index, pause} = this.state

//     this.setState({
//       index: (index + 1) % musicList.length,
//     })
//     this.updatePlayer()
//     if (pause) {
//       this.playerRef.play()
//     }
//   }

//   prevSong = () => {
//     const {musicList, index, pause} = this.state

//     this.setState({
//       index: (index + musicList.length - 1) % musicList.length,
//     })
//     this.updatePlayer()
//     if (pause) {
//       this.playerRef.play()
//     }
//   }

//   playOrPause = () => {
//     const {musicList, index, pause} = this.state
//     const currentSong = musicList[index]
//     const audio = new Audio(currentSong.audio)
//     if (!pause) {
//       this.playerRef.play()
//     } else {
//       this.playerRef.pause()
//     }
//     this.setState({
//       pause: !pause,
//     })
//   }

//   clickAudio = key => {
//     const {pause} = this.state

//     this.setState({
//       index: key,
//     })

//     this.updatePlayer()
//     if (pause) {
//       this.playerRef.play()
//     }
//   }

//   render() {
//     const {musicList, index, currentTime, pause} = this.state
//     const currentSong = musicList[index]
//     return (
//       <div className="card">
//         <div className="current-song">
//           <audio
//             ref={ref => {
//               this.playerRef = ref
//             }}
//           >
//             <source src={currentSong.audio} type="audio/ogg" />
//             <track kind="captions" srcLang="en" />
//             Your browser does not support the audio element.
//           </audio>
//           <div className="img-wrap">
//             <img src={currentSong.img} alt="" />
//           </div>
//           <span className="song-name">{currentSong.name}</span>
//           <span className="song-author">{currentSong.author}</span>

//           <div className="time">
//             <div className="current-time">{currentTime}</div>
//             <div className="end-time">{currentSong.duration}</div>
//           </div>

//           <div
//             ref={ref => {
//               this.timelineRef = ref
//             }}
//             id="timeline"
//           >
//             <div
//               ref={ref => {
//                 this.playheadRef = ref
//               }}
//               id="playhead"
//             />
//             <div
//               ref={ref => {
//                 this.hoverPlayheadRef = ref
//               }}
//               className="hover-playhead"
//               data-content="0:00"
//             />
//           </div>

//           <div className="controls">
//             <button
//               type="button"
//               onClick={this.prevSong}
//               className="prev prev-next current-btn"
//             >
//               <i className="fas fa-backward" />
//             </button>

//             <button
//               onClick={this.playOrPause}
//               type="button"
//               className="play current-btn"
//             >
//               {!pause ? (
//                 <i className="fas fa-play" />
//               ) : (
//                 <i className="fas fa-pause" />
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={this.nextSong}
//               className="next prev-next current-btn"
//             >
//               <i className="fas fa-forward" />
//             </button>
//           </div>
//         </div>
//         <div className="play-list">
//           {musicList.map((music, key = 0) => (
//             <div
//               key={key}
//               role="button"
//               onClick={() => this.clickAudio(key)}
//               aria-hidden="true"
//               className={`track ${
//                 index === key && !pause ? 'current-audio' : ''
//               }${index === key && pause ? 'play-now' : ''}`}
//             >
//               <img className="track-img" src={music.img} alt="" />
//               <div className="track-discr">
//                 <span className="track-name">{music.name}</span>
//                 <span className="track-author">{music.author}</span>
//               </div>
//               <span className="track-duration">
//                 {index === key ? currentTime : music.duration}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }
// }

// export default PlayerDevMode
