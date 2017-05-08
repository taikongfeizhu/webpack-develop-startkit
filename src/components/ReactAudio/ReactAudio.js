import React from 'react'
import ReactAudioPlayer from './ReactAudioPlayer'
import { Slider, Icon } from 'antd-mobile'
import classnames from 'classnames'
import raf from 'raf'
import PauseImage from './assets/PauseIcon.png'
import PlayImage from './assets/PlayIcon.png'

import './ReactAudio.scss'

class ReactAudio extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      firstEnter: true,
      playing: false,
      loaded: false,
      loop: false,
      volume: 0.6,
      dragging: false
    }
  }

  componentDidMount () {
    this.audio = this.player.audio
  }

  componentWillUnmount () {
    this.clearRAF()
  }

  handleToggle = () => {
    const { playing, loaded, firstEnter } = this.state
    if (firstEnter) {
      this.audio.load()
      this.setState({
        firstEnter: !firstEnter
      })
    } else if (loaded) {
      this.setState({
        playing: !playing
      })
      this.togglePlay()
    }
  }

  timeToSecond (duration) {
    const times = typeof duration === 'number' ? ['00', '00', '00'] : duration.split(':')
    const second = parseInt(times[2], 10) * 1
    const mintuesToSecond = parseInt(times[1], 10) * 60
    const hoursToSecond = parseInt(times[0], 10) * 3600
    return second + mintuesToSecond + hoursToSecond
  }

  handleOnLoad = () => {
    const { duration } = this.props
    const audioDuration = this.audio.duration
    this.setState({
      loaded: true,
      duration: audioDuration === Infinity ? this.timeToSecond(duration) : audioDuration
    })
    this.togglePlay()
  }

  togglePlay = () => {
    if (this.audio.paused) {
      this.audio.play()
    } else if (!this.audio.paused) {
      this.audio.pause()
    }
  }

  handleOnPlay = () => {
    this.setState({
      playing: true
    })
    this.renderSeekPos()
  }

  handleOnEnded = () => {
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleStop = () => {
    this.player.stop()
    this.setState({
      playing: false
    })
    this.renderSeekPos()
  }

  handleOnSliderChange = (e) => {
    this.audio.currentTime = e
    this.setState({
      dragging: true
    })
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  handleOnSliderAfterChange = () => {
    this.setState({
      dragging: false
    })
  }

  renderSeekPos = () => {
    this.setState({
      seek: this.audio.currentTime
    })
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  timeConvert (timestamp) {
    const minutes = Math.floor(timestamp / 60)
    let seconds = Math.floor(timestamp - (minutes * 60))
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    const minutesFilter = minutes >= 10 ? minutes : `0${minutes}`
    const time = `${minutesFilter}:${seconds}`
    return <span className='seek'>{time}</span>
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  renderButton (loaded, playing, firstEnter) {
    const circleButtonStyle = classnames({
      'circle-button-icon': true,
      playing: playing
    })

    const button = (
      <div className={circleButtonStyle}>
        {playing ? <img className='pause-icon' src={PauseImage} /> : <img className='play-icon' src={PlayImage} />}
      </div>
    )
    if (!firstEnter && !loaded) {
      return <div className={circleButtonStyle}><Icon type='loading' /></div>
    }
    return button
  }

  render () {
    const { duration, seek, playing, loaded, dragging, firstEnter } = this.state
    const currentPlayTime = seek ? parseInt(seek, 10) : 0
    const sldierValue = dragging ? seek : currentPlayTime
    return (
      <div className='audio-player'>
        <div className='audio-player-background'>
          <div className='audio-player-time'>
            {
              firstEnter ? '00:00'
              : (seek !== undefined) ? this.timeConvert(seek) : loaded ? '00:00' : '加载中..'
            }
          </div>
          <div className='audio-player-slider' onClick={this.handleOnClick}>
            <ReactAudioPlayer
              hidePlayer
              autoPlay={false}
              preload='none'
              src={this.props.src}
              playing={this.state.playing}
              onLoad={this.handleOnLoad}
              onPlay={this.handleOnPlay}
              onEnded={this.handleOnEnded}
              loop={this.state.loop}
              mute={this.state.mute}
              volume={this.state.volume}
              ref={(ref) => (this.player = ref)}
            />
            <Slider
              value={sldierValue}
              min={0}
              onChange={this.handleOnSliderChange}
              onAfterChange={this.handleOnSliderAfterChange}
              max={duration ? parseInt(duration, 10) : 1}
            />
          </div>
          <div className='audio-player-button' onClick={this.handleToggle}>
            <div className='circle-button'>
              {this.renderButton(loaded, playing, firstEnter)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactAudio.propTypes = {
  src: React.PropTypes.string.isRequired,
  duration: React.PropTypes.string.isRequired
}

export default ReactAudio
