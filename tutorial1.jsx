import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jQuery'
import { CommentList, CommentForm } from './tutorial2.jsx'


// tutorial3.js
class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
    }).done(function(data) {
      this.setState({data: data});
    }.bind(this)).fail(function(){  // <= Binding!
        this.setState({response: 'Ajax Request was failed '})
    }.bind(this));
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="/api/comments.json" pollInterval={2000} />,
  document.getElementById('content')
);


class InputBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '入力してください'
    };
  }

  componentDidMount() {
  }


  handleOnClick(e) {
    var input = this.refs.inputtest;
    alert(input.value);
  }

  handleOnChange() {
    var input = this.refs.inputtest;
    this.setState({text: input.value})
  }

  render() {
    return (
      <div>
        <input ref="inputtest" type="text" onChange={this.handleOnChange.bind(this)}/>
        <p>{this.state.text}</p>
        <button onClick={this.handleOnClick.bind(this)}>click</button>
      </div>
    );
  }
}

ReactDOM.render(
  <InputBox />,
  document.getElementById('inputbox')
);