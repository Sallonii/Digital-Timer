// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25 * 60, isTimerRunning: false, timerValue: 25} // timer is set in state in seconds

  // When user click on Start or Pause Buttons Timer should work accordingly

  onClickingStartAndPause = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      // If the timer is running(isTimerRunning is true)
      this.clearTimerInterval() // clear the timer interval
    } else {
      // if the timer is not running(isTimerRunning is false)
      this.intervalId = setInterval(this.timer, 1000) // set the interval
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning})) // Toggling the state isTimerRunning based on the previous state
  }

  onReset = () => {
    this.setState(prevState => ({
      timer: prevState.timerValue * 60,
      isTimerRunning: false,
    }))
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  timer = () => {
    const {timer} = this.state
    if (timer !== 0) {
      this.setState(prevState => ({timer: prevState.timer - 1})) // Decrementing time by 1
    } else {
      this.setState({isTimerRunning: false, timer: 25 * 60})
    }
  }

  formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    // if the value of the minutes is less than 9(single digit) then the 0 will be attached in front of it to form a double-digit

    const stringifiedSeconds =
      remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`
    // if the value of the seconds is less than 9(single digit) then the 0 will be attached in front of it to form a double-digit

    // here returning the formatted time (25:00)
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onDecrement = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timer: prevState.timer - 1 * 60,
        timerValue: prevState.timerValue - 1,
      }))
    }
  }

  onIncrement = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timer: prevState.timer + 1 * 60,
        timerValue: prevState.timerValue + 1,
      }))
    }
  }

  render() {
    const {timer, isTimerRunning, timerValue} = this.state

    const btnImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const btnText = isTimerRunning ? 'Pause' : 'Start'
    const btnAltTxt = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg">
        <h1>Digital Timer</h1>
        <div className="content-container">
          <div className="time-cont">
            <div className="time-item">
              <h1 className="time-heading">{this.formatTime(timer)}</h1>
              <p>{isTimerRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="updation-container">
            <div className="buttons-container">
              <button
                type="button"
                className="btn-style"
                onClick={this.onClickingStartAndPause}
              >
                <img src={btnImg} alt={btnAltTxt} className="btn-img-style" />
                {btnText}
              </button>
              <button
                type="button"
                className="btn-style"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="btn-img-style"
                />
                Reset
              </button>
            </div>
            <p>Set Timer Limit</p>
            <div className="timer-limit-container">
              <button
                type="button"
                className="time-limit-btn"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="time-limit">{timerValue}</p>
              <button
                type="button"
                className="time-limit-btn"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
