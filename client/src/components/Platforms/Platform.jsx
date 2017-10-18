import React, { Component } from 'react';
import styled from 'styled-components';
import PlatformForm from './PlatformForm';

const PlatformDiv = styled.div`
  height: 275px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button{
    background-color: blue;
    color: white;
    font-size: 16px;

    border-radius: 20px;
    border: none;
    outline: none;

    :active{
        background-color: darkblue;
    }
  }
  .edit{
    margin-right: 25%;
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
                <PlatformDiv>
                  <div>
                     <h1>{this.props.platform.name}</h1>
                     <hr/>
                     <div>Manufacturer: {this.props.platform.manufacturer}</div>
                     <div>Price: ${this.props.platform.price}</div>
                  </div>
                  <div>
                     <button className='edit' onClick={this.toggleEdit}>Edit</button>
                     <button id={this.props.platform._id} onClick={this.props.handleDelete}>Delete</button>
                  </div>
                </PlatformDiv>
            }
         </div>
      );
   }
}

export default Platform;