import React, { Component } from 'react';
import styled from 'styled-components';
import Platform from './Platform';

const Platforms = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`
const PlatformsListDiv = styled.div`
   width: 25%;
   margin: 5%;
   min-height: 300px;

   background-color: gray;
   border-radius: 20px;

   padding: 5%;
`
const PlatformSelection = styled.div`
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
const PlatformInfo = styled.div`
   width: 60%;
   margin: 5%;
   height: 300px;

   background-color: gray;
   border-radius: 20px;

   padding: 5%;
   background-color: gray;
   border-radius: 20px;
`

class PlatformsList extends Component {
   state={
      selectedPlatform: null
   }

   componentWillReceiveProps = () =>{
      this.setState({selectedPlatform: null});
   }

   handleDelete = (e) =>{
      let platformId = e.target.id;
      this.props.deletePlatform(platformId);
      this.setState({selectedPlatform: null})
   }

   handleUpdate = async (platform) =>{
      try{
         await this.props.changePlatform(platform);
         this.setState({selectedPlatform: platform})
      }catch(err){console.log(err)}
   }

   handleRadio = (e) =>{
      let platformIndex = e.target.value;
      const platform = this.props.platforms[platformIndex];
      this.setState({selectedPlatform: platform})
   }

   render() {
      return (
         <Platforms>
            <PlatformsListDiv>
            {
               this.props.platforms.map((platform, index) => {
                  return (
                     <PlatformSelection key={platform._id}>
                        <input
                           type='radio'
                           name='platform'
                           key={platform._id}
                           id={`platformChoice${index}`}
                           value={index}
                           onClick={this.handleRadio}
                        />
                        <label htmlFor={`platformChoice${index}`}>{platform.name}</label>
                     </PlatformSelection>
                  )
               })
            }
            </PlatformsListDiv>
            <PlatformInfo>
            {  
               this.state.selectedPlatform ?
                  <Platform
                     key={this.state.selectedPlatform._id}
                     platform={this.state.selectedPlatform}
                     handleDelete={this.handleDelete}
                     handleChange={this.handleUpdate}
                  />
               :
                  null
            }
            </PlatformInfo>
         </Platforms>
      );
   }
}

export default PlatformsList;