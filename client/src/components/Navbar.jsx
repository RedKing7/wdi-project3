import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Nav = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-around;
   height: 30px;
   background-color: gray;
   align-items: center;

   div{
      width: 15%;
      text-align: center;
      border-radius: 10px;
   }

   div:hover{
      background-color: blue;
   }

   a{
      text-decoration: none;
      color: white;
   }
`

class Navbar extends Component {
   render() {
      return (
         <Nav>
            <div>
               <Link to='/login'>Log in</Link>
            </div>
            {/* if logged in, then show link to platforms and games, and logout */}
         </Nav>
      );
   }
}

export default Navbar;