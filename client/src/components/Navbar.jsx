import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Nav = styled.div`
   font-family: Sans-serif;
   width: 100%;
   display: flex;
   justify-content: space-around;
   height: 30px;
   background-color: gray;
   border-radius: 10px;
   align-items: center;

   div{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
   }

   span{
      width: 15%;
      text-align: center;
      border-radius: 10px;
   }

   span:hover{
      background-color: blue;
   }

   a{
      text-decoration: none;
      color: white;
   }
`

class Navbar extends Component {
   state={
      currentUserId: null
   }

   componentWillReceiveProps = () =>{
      const userId = window.location.pathname.split('/')[1]; // gets the userId portion from the url (yeah, it's hacky)
      console.log(userId)
      this.setState({currentUserId: userId})
   }

   render() {
      return (
         <Nav>
            {
            this.state.currentUserId !== null && this.state.currentUserId !== 'login' ?
               <div>
                  <span>
                     <Link to={`/${this.state.currentUserId}/games`}>My Games</Link>
                  </span>
                  <span>
                     <Link to={`/${this.state.currentUserId}/platforms`}>My Platforms</Link>
                  </span>
                  <span>
                     <Link onClick={this.props.refreshNav} to='/login'>Change User</Link>
                  </span>
                  {/* when going back to login, refresh navbar */}
               </div>
            :       
               <div>
                  <span>
                     <Link to='/login'>Log in</Link>
                  </span>
               </div>        
            }
         </Nav>
      );
   }
}

export default Navbar;