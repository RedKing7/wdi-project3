import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
import Signup from './Signup';

const LoginMain = styled.div`
   text-align: center;
`

const Users = styled.div`
   display: flex;
   flex-direction: row;
`

const UserList = styled.div`
   width: 30%;
   margin: 5%;
   min-height: 300px;

   text-align: left;
   background-color: gray;

   padding: 5%;

   label{
      margin-left: 10%;
   }
`

const UserOptions = styled.div`
   background-color: gray;
   width: 50%;
   margin: 5%;
   min-height: 300px;

   a{
      text-decoration: none;
      color: white;
   }
   a:hover{
      color: blue;
   }
`

const Selection = styled.div`
   label{
      font-family: Sans-serif;
   }
`

class LoginPage extends Component {
   state = {
      users: [],
      selection: null
   }

   componentWillMount = () =>{
      this.getUsers();
   }

   getUsers = async () =>{
      try{
         const response = await axios.get('api/users');
         this.setState({users: response.data})
      }catch(err){console.log(err)}
   }

   handleRadio = async (e) =>{
      try{
         const userIndex = this.state.users[e.target.value];
         this.setState({selection: userIndex})
      }catch(err){console.log(err)}
   }

   render() {
      return (
         <LoginMain>
            <h1>Users</h1>
            <hr/>
            <Users>
               <UserList>
               {
                  this.state.users.map((user, index) => {
                     return (
                        <Selection key={user._id}>
                           <input
                              key={user._id}
                              type='radio'
                              name='user'
                              htmlFor={`userChoice${index}`}
                              value={index}
                              onClick={this.handleRadio}
                           />
                           <label htmlFor={`userChoice${index}`}>{user.username}</label>
                        </Selection>
                     )
                  })
               }
               </UserList>
               <UserOptions>
               {
                  this.state.selection ?
                     <div>
                        <h1>{this.state.selection.username}</h1>
                        <hr/>
                        <Link to={`/users/${this.state.selection._id}`}>View</Link>
                        <br/>
                        <Link to='#'>Delete</Link>
                     </div>
                  :
                     null
               }
               </UserOptions>
            </Users>
            <hr/>
            <Signup/>
         </LoginMain>
      );
   }
}

export default LoginPage;