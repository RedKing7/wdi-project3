import React, { Component } from 'react';
import styled from 'styled-components';
import Home from './components/Home';

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
      <Body>
        <h1>Hello, World!</h1>
        <Home/>
      </Body>
    );
  }
}

export default App;
