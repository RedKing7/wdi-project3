import React, { Component } from 'react';
import styled from 'styled-components';

const UserListDiv = styled.div`
   width: 25%;
   margin: 5%;
   min-height: 300px;

   background-color: gray;
   border-radius: 20px;

   padding: 5%;
`
const Selection = styled.div`
   label{
      display: block;
      padding: 5px;
      border-radius: 10px;
   }

   label:hover{
      background-color: blue;
   }

   input{
      display: none;
   }

   input:checked + label{
      background-color: darkblue;
   }
`  

class UserList extends Component {
   render() {
      return (
         <UserListDiv>
               {
                  this.props.users.map((user, index) => {
                     return (
                        <Selection key={user._id}>
                           <input
                              type='radio'
                              name='user'
                              key={user._id}
                              id={`userChoice${index}`}
                              value={index}
                              onClick={this.props.handleRadio}
                           />
                           <label htmlFor={`userChoice${index}`}>{user.username}</label>
                        </Selection>
                     )
                  })
               }
         </UserListDiv>
      );
   }
}

export default UserList;