import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jQuery'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      todos: []
    };
  }

  // componentDidMount() {
  // }

  handleOnClick(e) {
    var index = this.state.index
    var todo = this.refs.todo;
    var todos = this.state.todos.concat({id: index, name: todo.value, complete: false});
    this.setState({todos: todos})
    this.setState({index: index + 1})
  }

  handleOnClickComplete(todo) {
    var index = todo.id
    var todos = this.state.todos
    if(todo.complete) {
      todo.complete = false;
    } else {
      todo.complete = true;
    }
    todos.index = todo
    this.setState({todos: todos})
  }

  handleOnClickRemove(todo) {
    var index = todo.id
    var todos = this.state.todos
    todos.splice(index, 1)
    this.setState({todos: todos})
  }

  render() {
    var handlerComplete = this.handleOnClickComplete.bind(this);
    var handlerRemove = this.handleOnClickRemove.bind(this);
    return (
      <div>
       <input type="text" ref="todo" />&nbsp;
       <button onClick={this.handleOnClick.bind(this)}>TODO追加</button>
       <ul>{
        this.state.todos.map(function(todo) {
          return <Todo key={todo.id} todo={todo} handleOnClickComplete={handlerComplete} handleOnClickRemove={handlerRemove} />
        })
       }</ul>
      </div>
    );
  }
}

class Todo extends React.Component {

  handleOnClickComplete() {
    var todo = this.props.todo
    this.props.handleOnClickComplete(todo)
  }

  handleOnClickRemove() {
    var todo = this.props.todo
    this.props.handleOnClickRemove(todo)
  }

  render() {
    var textdecoration = 'none';
    if(this.props.todo.complete) {
      textdecoration = 'line-through';
    }
    var style = {
      textDecoration: textdecoration
    }
    return (
      <li>
        <span style={style}>{this.props.todo.name}</span>&nbsp;
        <button onClick={this.handleOnClickComplete.bind(this)}>{(this.props.todo.complete)? '取り消し' : '完了'}</button>&nbsp;
        <button  onClick={this.handleOnClickRemove.bind(this)}>削除</button>
      </li>
    )
  }
}

ReactDOM.render(
  <TodoList />,
  document.getElementById('todolist')
);