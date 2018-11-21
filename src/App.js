import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import Profile from './components/Profile';
import Repo from './components/Repo';

import 'antd/dist/antd.css';
import './App.css';

import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

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
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{ marginTop: '60px' }}>
            <Menu.Item key="1">
              <Link to='/'>
                <Icon type="user" />
                <span className="nav-text">Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/repo'>
                <Icon type="bars" />
                <span className="nav-text">All Repos</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200, height: '100vh' }} >
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff' }}>
              <Switch>
                <Route
                  exact path='/'
                  render={() =>
                    <Profile
                      events_data={this.state.events_data}
                      user_data={this.state.user_data}
                      repo_data={this.state.repo_data}
                      followers_data={this.state.followers_data}
                      following_data={this.state.following_data}
                    />
                  }
                />
                <Route
                  exact path='/repo'
                  render={() =>
                    <Repo
                      repo_data={this.state.repo_data}
                    />
                  }
                />
              </Switch>


            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
      </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
