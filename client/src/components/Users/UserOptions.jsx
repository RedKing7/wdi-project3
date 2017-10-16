import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
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

   handleDeleteUser = async () =>{
      try{
         console.log(this.props.selection._id);
         let { userId } = this.props.selection._id;
         let response = await axios.delete(`/api/users/${userId}`)
         console.log(response);
      }catch(err){console.log(err)}
   }

   render() {
      return (
         <UserOptionsDiv>
            {
               this.props.selection ?
                  <div>
                     <h1>{this.props.selection.username}</h1>
                     <hr/>
                     <Link to={`/${this.props.selection._id}`}>View</Link>
                     <br/>
                     <Link to={`/login`} onClick={this.handleDeleteUser}>Delete</Link>
                  </div>
               :
                  null //set userOptions display to none
            }
         </UserOptionsDiv>
      );
   }
}

export default UserOptions;