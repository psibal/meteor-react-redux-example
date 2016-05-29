import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleTodo, removeTodo } from '../actionCreators';

import Task from './task.jsx';
 
const mapStateToProps = (state) => {
  return {
    todos: state.todos.filter(todo => state.visibilityFilter === 'ALL' || !todo.checked)
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(toggleTodo(id)),
  removeTodo: (id) => dispatch(removeTodo(id)),
});

const EmptyTaskPlaceHolder = () => (<ul><li><em>There is no task yet.</em></li></ul>);

// App component - represents the whole app
class TaskList extends Component {
  renderTasks() {
    return this.props.todos.map((task, i) => (
      <Task 
        key={i} task={task} 
        onToggled={() => this.props.toggleTodo(task.id)}
        onDeleted={() => this.props.removeTodo(task.id)}
        />
    ));
  }
 
  render() {
    return (
      <ul>
        {this.props.todos.length ? 
          this.renderTasks() :
          <EmptyTaskPlaceHolder />
        }
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);