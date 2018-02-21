import React, { Component } from 'react';
import '../css/App.css';
import Timer from './Timer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 1500, 
      timeStringMS: '25:00',
      work_session_count: 0,
      nextToggleAction: 'Start'
    };

    this.secondsToMinSec = this.secondsToTimeStringMS.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.timerButtonHandler = this.timerButtonHandler.bind(this);
  }

  secondsToTimeStringMS(s) {
    return (s-(s%=60))/60+(9<s?':':':0')+s;
  }

  countdown() {
    let seconds = this.state.seconds - 1;

    if (seconds <= 0) {
      this.resetTimer();
      return
    }
    this.setState(
      {
        seconds,
        timeStringMS: this.secondsToTimeStringMS(seconds)
      }
    );
  };

  timerButtonHandler() {
    this.state.nextToggleAction == 'Start' ? this.startTimer() : this.resetTimer();
  }

  startTimer() {
    this.setState({
      nextToggleAction: 'Reset'
    }
    )
    this.timer = setInterval(this.countdown, 1000);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.setState({
        nextToggleAction: 'Start',
        seconds: 1500, 
        timeStringMS: '25:00',
      }
    )
  }

  render() {
    return (
      <div className="App">

      <Timer seconds={this.state.seconds} timeStringMS={this.state.timeStringMS} timerButtonHandler={this.timerButtonHandler} nextToggleAction={this.state.nextToggleAction} />
      </div>
    );
  }
}


export default App;
