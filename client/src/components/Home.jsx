import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Main = styled.div`
   font-family: Sans-serif;
   text-align: center;
   div:hover{
      background-color: blue;
   }
   a{
      text-decoration: none;
      color: white;
      border-top: 1px solid hidden;
      border-bottom: 1px solid hidden;
   }
`

class Home extends Component {
   render() {
      return (
         <Main>
            <h1>Home</h1>
            <hr/>
            <div>
               <Link to='/login'>Log In</Link>
            </div>
         </Main>
      );
   }
}

export default Home;