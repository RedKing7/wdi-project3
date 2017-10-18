import React, { Component } from 'react';
import styled from 'styled-components';
import PlatformForm from './PlatformForm';

const PlatformDiv = styled.div`
  input:hover{
    background-color: blue;
  }
`

class Platform extends Component {
   state={
      platform: {},
      editing: false
   }

   toggleEdit = () =>{
      let current = this.state.editing;
      this.setState({editing: !current});
   }

   updatePlatform = async (changedPlatform) => {
      try{
         await this.setState({platform: changedPlatform})
         this.toggleEdit();
         this.props.handleChange(this.state.platform)
      }catch(err){console.log(err)}
    }

   render() {
      return (
         <div>
            {
               this.state.editing ?
                  <PlatformForm platform={this.props.platform} updatePlatform={this.updatePlatform}/>
               :
                  <div>
                     <h1>{this.props.platform.name}</h1>
                     <hr/>
                     <div>Manufacturer: {this.props.platform.manufacturer}</div>
                     <div>Price: ${this.props.platform.price}</div>

                     <button id={this.props.platform._id} onClick={this.props.handleDelete}>Delete</button>
                     <button onClick={this.toggleEdit}>Edit</button>
                  </div>
            }
         </div>
      );
   }
}

export default Platform;