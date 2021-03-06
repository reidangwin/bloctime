import React, { Component } from 'react';
import '../css/App.css';
import Timer from './Timer';
import TaskList from './TaskList';
import buzz from 'buzz';
import triangle from '../css/sounds/triangle_hit.mp3';
import base from '../base';


class App extends Component {
  constructor() {
    super();

    this.BREAK_SECONDS = 300;
    this.WORK_SECONDS = 1500;

    this.secondsToMinSec = this.secondsToTimeStringMS.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.timerButtonHandler = this.timerButtonHandler.bind(this);
    this.addTask = this.addTask.bind(this);

    this.state = {
      seconds: this.WORK_SECONDS, 
      timeStringMS: this.secondsToTimeStringMS(this.WORK_SECONDS),
      onBreak: false,
      workSessionCount: 0,
      nextToggleAction: 'Start',
      taskList: {} 
    };

    this.mySound = new buzz.sound( triangle, {
      preload: true
    });
  }

  componentWillMount() {
    this.ref = base.syncState('taskList', {
      context: this,
      state: 'taskList'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  secondsToTimeStringMS(s) {
    return (s-(s%=60))/60+(9<s?':':':0')+s;
  }

  countdown() {
    let seconds = this.state.seconds - 1;

    if (seconds <= 0) {
      this.mySound.play();

      seconds = this.state.onBreak ? this.WORK_SECONDS : this.BREAK_SECONDS;
      let onBreak = !this.state.onBreak;
      let workSessionCount = !this.state.onBreak ? this.state.workSessionCount + 1 : this.state.workSessionCount;

      if (workSessionCount > 3) {
        workSessionCount = 0;
        seconds = 1800;
      }

      this.setState({
        workSessionCount,
        seconds,
        timeStringMS: this.secondsToTimeStringMS(seconds),
        onBreak,
        nextToggleAction: 'Start',
      })
      clearInterval(this.timer);
      return
    }

    /* Timer has been decremented at the top. We store the new seconds value in state and the caller (startTimer) will keep running the function until we hit 0, or resetTimer calls clearInterval. */

    this.setState(
      {
        seconds,
        timeStringMS: this.secondsToTimeStringMS(seconds)
      }
    );

  };

  timerButtonHandler() {
    if (this.state.nextToggleAction === 'Start') {
      this.startTimer();
    } else {
      this.resetTimer();
    }
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
    let seconds = this.state.onBreak ? this.BREAK_SECONDS : this.WORK_SECONDS;
    this.setState({
      nextToggleAction: 'Start',
      seconds,
      timeStringMS: this.secondsToTimeStringMS(seconds)
    }
    )
  }

  addTask(task){
    const taskList = {...this.state.taskList};
    const timestamp = Date.now();
    taskList[`task-${timestamp}`] = task;
    this.setState({ taskList });
  }

  render() {
    return (
      <div className="App">
      <TaskList taskList={this.state.taskList} addTask={this.addTask} />
      <Timer timeStringMS={this.state.timeStringMS} timerButtonHandler={this.timerButtonHandler} nextToggleAction={this.state.nextToggleAction} />
      </div>
    );
  }
}

export default App;
