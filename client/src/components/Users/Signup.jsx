import React, { Component } from 'react';

class Signup extends Component {
   state = {
      username: ''
   }
   
   handleSubmit = (e) =>{
      e.preventDefault();
      console.log('Submit!')
      this.props.newUser(this.state.username);
   }

   handleChange = (e) =>{
      let val = e.target.value;
      console.log(val);
      this.setState({username: val})
   }

   render() {
      return (
         <div>
            <h1>New User</h1>

            <form onSubmit={this.handleSubmit}>
               <input
                  type="text"
                  name='username'
                  value={this.state.username}
                  placeholder='Username'
                  onChange={this.handleChange}
               />
               <input type="submit"/>
            </form>
         </div>
      );
   }
}

export default Signup;