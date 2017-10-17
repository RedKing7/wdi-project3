import React, { Component } from 'react';
import styled from 'styled-components';

const FormDiv = styled.div`
   background-color: black;
   color: white;
   
   .input{
      width: 70%;
      margin:0 auto;
      display: flex;
      justify-content: space-between;
   }

   .check{
      margin-right: 50%;
   }

   form{
      display: flex;
      flex-direction: column;
   }

   input{
      background: none;
      color: white;
      font-size: 16px;
      outline: none;
   }

   .submit{
         background-color: blue;
         border: none;
         width: 80px;
         margin: 0 auto;
         margin-top: 10px;
         border-radius: 20px;
   }
`
class PlatformForm extends Component {
   state={
      changedPlatform: {}
   }

   componentWillMount = async () =>{
      await this.setState({changedPlatform: this.props.platform})
   }

   handleChange = (e) =>{
      const attribute = e.target.name;
      const value = e.target.value;
      const changedPlatform = {...this.state.changedPlatform}
      changedPlatform[attribute] = value
      this.setState({changedPlatform: changedPlatform})
   }

   handleSubmit = (e) =>{
      e.preventDefault();
      this.props.updatePlatform(this.state.changedPlatform);
   }

   render() {
      return (
         <FormDiv>
               <div>
                  <form onSubmit={this.handleSubmit}>
                        <div className="input">
                           <label>Name: </label>
                           <input
                              name='name'
                              type="string"
                              onChange={this.handleChange}
                              value={this.state.changedPlatform.name}
                              required
                           />
                        </div>

                        <div className="input">
                           <label>Manufacturer: </label>
                           <input
                              name='manufacturer'
                              type="string"
                              onChange={this.handleChange}
                              value={this.state.changedPlatform.manufacturer}
                           />
                        </div>
                        
                        <div className="input">
                           <label >Price: </label>
                           <input
                              name='price'
                              type="number"
                              min='0.00'
                              step='.01'
                              onChange={this.handleChange}
                              value={this.state.changedPlatform.price}
                           />
                        </div>

                        <input onSubmit={this.handleSubmit} className='submit' type="submit"/>
                  </form>
               </div>
         </FormDiv>
      );
   }
}

export default PlatformForm;