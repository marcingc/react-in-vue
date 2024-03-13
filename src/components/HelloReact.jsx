import React from "react";
import PropTypes from "prop-types";
import {Gantt} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

const propTypes = {
  name: PropTypes.string,
  tasks: PropTypes.array
};



export default class HelloReact extends React.Component {
  render() {
    return <div>
      Hello {this.props.name}, I am a React component
      <p>{this.props.tasks[0].name}</p>
      <div>
        <Gantt tasks={this.props.tasks} />
      </div>
    </div>;
  }
}

HelloReact.propTypes = propTypes;
