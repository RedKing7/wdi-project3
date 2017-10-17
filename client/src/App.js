import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components';
import Home from './components/Home';
import LoginPage from './components/Users/LoginPage';
import GamesPage from './components/Games/GamesPage';
// import PlatformsPage from './components/Platforms/PlatformsPage';
import Navbar from './components/Navbar';

injectGlobal`
  body{
    background-color: black;
    color: white;
    min-height: 100vh;
  }
`
const Main = styled.div`
  width: 100%;
`

class App extends Component {
  render() {
    return (
      <Router>
          <Main>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home} />
              {<Route exact path="/login" component={LoginPage} />}
              {/* access userId using this.props.match.params */}
              <Route exact path="/:userId/games" component={GamesPage}/>
              {/* <Route exact path="/:userId/platforms" component={PlatformsPage}/> */}
            </Switch>
          </Main>
      </Router>
    );
  }
}

export default App;
