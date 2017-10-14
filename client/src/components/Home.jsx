import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Main = styled.div`
   font-family: Sans-serif;
   text-align: center;
`

class Home extends Component {
   render() {
      return (
         <Main>
            <h1>Home</h1>
            <hr/>
            <Link to='/login'>Log In</Link>
         </Main>
      );
   }
}

export default Home;