import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Signup from './Signup';
import UserList from './UserList';
import UserOptions from './UserOptions';

const LoginMain = styled.div`
   text-align: center;
   font-family: Sans-serif;
`
const Users = styled.div`
   background-color: darkblue;
   max-width: 1000px;
   margin: 0 auto;
   border-radius: 5px;
   display: flex;
   flex-direction: row;
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
         await axios.post('/api/users', {
            "user": {username}
         })
         this.getUsers();
      }catch(err){console.log(err)}
   }

   deleteUser = async (userId) =>{
      try{
         await axios.delete(`/api/users/${userId}`);
         this.setState({selection: null});
         this.getUsers();
      }catch(err){console.log(err)}
   }

   render() {
      return (
         <LoginMain>
            <h1>Users</h1>
            <hr/>
            <Users>
               <UserList users={this.state.users} handleRadio={this.handleRadio}/>
               <UserOptions selection={this.state.selection} handleDeleteUser={this.deleteUser} viewChange={this.props.changeUser}/>
            </Users>
            <hr/>
            <Signup newUser={this.newUser}/>
         </LoginMain>
      );
   }
}

export default LoginPage;