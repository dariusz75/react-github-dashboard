import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {

  state = {
    user_data: null,
    repo_data: [],
    events_data: [],
    followers_data: [],
    following_data: []
  }

  fetchData(username) {
    axios.get('https://api.github.com/users/' + username)
      .then((response) => {
        this.setState({
          user_data: {
            name: response.data.name,
            bio: response.data.bio,
            avatar_url: response.data.avatar_url,
            followers: response.data.followers,
            following: response.data.following
          }
        })
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('https://api.github.com/users/' + username + '/repos')
      .then((response) => {
        this.setState({
          repo_data: response.data.map(repo => ({
            id: repo.id,
            name: repo.name,
            owner: repo.owner,
            description: repo.description,
            html_url: repo.html_url
          }))
        })
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('https://api.github.com/users/' + username + '/events')
      .then((response) => {
        this.setState({
          events_data: response.data.map(event => ({
            type: event.type,
            repo: event.repo
          }))
        })
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('https://api.github.com/users/' + username + '/followers')
      .then((response) => {
        this.setState({
          followers_data: response.data.map(follower => ({
            login: follower.login,
            html_url: follower.html_url,
            avatar_url: follower.avatar_url
          }))
        })
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('https://api.github.com/users/' + username + '/following')
      .then((response) => {
        this.setState({
          following_data: response.data.map(following => ({
            login: following.login,
            html_url: following.html_url,
            avatar_url: following.avatar_url
          }))
        })
      })
      .catch((error) => {
        console.log(error);
      })

  }



  componentDidMount() {
    this.fetchData('dariusz75');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
