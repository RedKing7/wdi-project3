import React, { Component } from 'react';
import styled from 'styled-components';

const SignupDiv = styled.div`
   width: 100%;
`

const OnButton = styled.button`
   background-color: blue;
   color: white;
   font-size: 20px;

   width: 150px;
   margin-bottom: 30px;
   border-radius: 20px;
   border: none;
   outline: none;

   :active{
      background-color: darkblue;
   }
`

const OffButton = styled.button`
   background-color: blue;
   color: white;
   font-size: 20px;

   width: 150px;
   margin-bottom: 30px;
   border-radius: 20px;
   border: none;
   outline: none;

   :active{
      background-color: darkblue;
   }
`

const Form = styled.div`
   border-radius: 20px;
   background-color: gray;
   width: 50%;
   padding-bottom: 20px;
   margin: 0 auto;

   display: flex;
   flex-direction: column;
   align-items: center;

   button{
      margin-bottom: 15px;
   }

   input{
      border-radius: 5px;
      border: none;
      text-align: center;
      margin-bottom: 5px;
   }

   .submit{
      background-color: blue;
      color: white;
      outline: none;
   }
`

class Signup extends Component {
   state = {
      formActive: false,
      username: ''
   }
   
   handleSubmit = (e) =>{
      e.preventDefault();
      this.props.newUser(this.state.username);
      this.setState({username: null});
      this.toggleForm();
   }

   handleChange = (e) =>{
      let val = e.target.value;
      this.setState({username: val})
   }

   toggleForm = () =>{
      let current = this.state.formActive;
      this.setState({formActive: !current});
   }

   render() {
      return (
         <SignupDiv>
            {
               this.state.formActive ?
                  <Form>
                     <OffButton onClick={this.toggleForm}>Hide</OffButton>
                     <form onSubmit={this.handleSubmit}>
                        <input
                           type="text"
                           name='username'
                           value={this.state.username}
                           placeholder='Username'
                           onChange={this.handleChange}
                           required
                        />
                        <br/>
                        <input className='submit' type="submit"/>
                     </form>
                  </Form>
               :
                  <OnButton onClick={this.toggleForm}>New User</OnButton>
            }
         </SignupDiv>
      );
   }
}

export default Signup;