import React, { Component } from 'react';
import styled from 'styled-components';

const Main = styled.div`
   background-color: black;
   color: white;
`

class Home extends Component {
   render() {
      return (
         <Main>
            <h1>Home</h1>
         </Main>
      );
   }
}

export default Home;