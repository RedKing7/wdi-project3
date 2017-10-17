import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const UserOptionsDiv = styled.div`
   background-color: gray;
   width: 65%;
   margin: 5%;
   min-height: 300px;
   border-radius: 20px;
   a{
      display: block;
      text-decoration: none;
      color: white;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
   }
   a:hover{
      background-color: blue;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
   }
`

class UserOptions extends Component {

   handleDelete = () =>{
      this.props.handleDeleteUser(this.props.selection._id);
   }

   render() {
      return (
         <UserOptionsDiv>
            {
               this.props.selection ?
                  <div>
                     <h1>{this.props.selection.username}</h1>
                     <hr/>
                     <Link to={`/${this.props.selection._id}/games`}>View Games</Link>
                     <br/>
                     <Link to={`/${this.props.selection._id}/platforms`}>View Platforms</Link>
                     <br/>
                     <Link to={`/login`} onClick={this.handleDelete}>Delete User</Link>
                  </div>
               :
                  null //set userOptions display to none
            }
         </UserOptionsDiv>
      );
   }
}

export default UserOptions;