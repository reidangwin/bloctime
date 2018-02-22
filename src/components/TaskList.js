import React, { Component } from 'react';
import App from './App' 
import { Button } from 'react-bootstrap';

class TaskList extends Component {
  createTask(event) {
    event.preventDefault();
    this.props.addTask(this.task.value);
    this.taskForm.reset();
  }

  render() {
    return (
      <div className="row-offcanvas row-offcanvas-left">
        <div id="sidebar" class="sidebar-offcanvas">
          <div className="col-md-12">
            <h3>Task History</h3>
            <form ref={(input) => this.taskForm = input} className="task-edit" onSubmit={(e) => this.createTask(e)}>
              <input ref={(input) => this.task = input} type="text" placeholder="Task" />
              <Button type="submit">Add Task</Button>
            </form>
              <table className="table table-striped table-dark">
                <tbody>
                  {Object.keys(this.props.taskList).map( (key) =>
                    <tr key={key}><td>{this.props.taskList[key]}</td></tr>
                  )};
                </tbody>
              </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList;
