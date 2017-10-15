import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
import Signup from './Signup';

const LoginMain = styled.div`
   text-align: center;
   font-family: Sans-serif;
`
const Users = styled.div`
   display: flex;
   flex-direction: row;
`
const UserList = styled.div`
   width: 25%;
   margin: 5%;
   min-height: 300px;

   background-color: gray;
   border-radius: 10;

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
const UserOptions = styled.div`
   background-color: gray;
   width: 65%;
   margin: 5%;
   min-height: 300px;

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

   newUser = async (username) =>{
      try{
         const response = await axios.post('/api/users', {
            "user": {username}
         })
         this.getUsers();
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
                              id={`userChoice${index}`}
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
                        <Link to={`/${this.state.selection._id}`}>View</Link>
                        <br/>
                        <Link to='#'>Delete</Link>
                     </div>
                  :
                     null //set userOptions display to none
               }
               </UserOptions>
            </Users>
            <hr/>
            <Signup newUser={this.newUser}/>
         </LoginMain>
      );
   }
}

export default LoginPage;