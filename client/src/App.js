import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components';
import Home from './components/Home';
import LoginPage from './components/Users/LoginPage';

const Body = styled.div`
  background-color: black;
  color: white;
  height: 100vh;
  width: 100vw;
  h1{
    margin: 20px;
  }
`

class App extends Component {
  render() {
    return (
      <Router>
        <Body>
          {/* <NavBar /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            {<Route exact path="/login" component={LoginPage} />}
            {/* access userId using this.props.match.params */}
            {/* <Route exact path="/idea/:userId" component={IdeaPage} /> */}
          </Switch>
        </Body>
      </Router>
    );
  }
}

export default App;
