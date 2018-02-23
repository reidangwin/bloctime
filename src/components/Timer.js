import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Timer extends Component {
  render() {
    return (
      <div className="timer">
        <div className="clock-text item">{this.props.timeStringMS}</div>
        <Button className="item center-block" onClick={() => this.props.timerButtonHandler()}>{this.props.nextToggleAction}</Button>
      </div> 
    );
  }
}

export default Timer;
