import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components';
import LoginPage from './components/Users/LoginPage';
import GamesPage from './components/Games/GamesPage';
import PlatformsPage from './components/Platforms/PlatformsPage';
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
  state={
    refresh: null
  }

  refreshNavbar = async () =>{
    try{
      await this.setState({refresh: true}) //this lets NavBar refresh whenever the user changes
    }catch(err){console.log(err)}
  }

  render() {
    return (
      <Router>
          <Main>
            <Navbar refreshProp={this.state.refresh} refreshNav={this.refreshNavbar}/>
            <Switch>
              <Route exact path="/" render={()=>(<Redirect to='/login'/>)}/>
              <Route exact path="/login" render={()=>(
                <LoginPage changeUser={this.refreshNavbar}/>
              )}/>
              <Route exact path="/:userId/games" component={GamesPage}/>
              <Route exact path="/:userId/platforms" component={PlatformsPage}/>
            </Switch>
          </Main>
      </Router>
    );
  }
}

export default App;
