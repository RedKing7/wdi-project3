import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components';
import Home from './components/Home';
import LoginPage from './components/Users/LoginPage';
import GamesPage from './components/Games/GamesPage';
import Navbar from './components/Navbar';

const Body = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  min-height: 100vh;
  h1{
    margin: 20px;
  }
`

class App extends Component {
  render() {
    return (
      <Router>
        <Body>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home} />
            {<Route exact path="/login" component={LoginPage} />}
            {/* access userId using this.props.match.params */}
            <Route exact path="/:userId" component={GamesPage}/>
          </Switch>
        </Body>
      </Router>
    );
  }
}

export default App;
