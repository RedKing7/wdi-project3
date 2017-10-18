import React, { Component } from 'react';
import PlatformsList from './PlatformsList';
import axios from 'axios';
import styled from 'styled-components';

const Main = styled.div`
   text-align: center;
   font-family: Sans-serif;
`

const PlatformsBlocks = styled.div`
   background-color: darkblue;
   margin-top: 0;
   max-width: 1000px;
   margin: 0 auto;
   border-radius: 5px;
`

class PlatformsPage extends Component {
   state = {
      user: {},
      platforms: []
   }

   async componentWillMount(){
      try{
         let userId = this.props.match.params.userId;
         let res = await axios.get(`/api/users/${userId}`)
         await this.setState({user: res.data});
         this.refreshPlatforms();
      }catch(err){console.log(err)}
   }

   addPlatform = async () =>{
      try{
         let userId = this.props.match.params.userId;
         let response = await axios.post(`/api/users/${userId}/platforms`);
         await this.setState({user: response.data})
         this.refreshPlatforms();
      }catch(err){console.log(err)}
   }

   deletePlatform = async (id) =>{
      try{
         let { userId } = this.props.match.params
         let res = await axios.delete(`/api/users/${userId}/platforms/${id}`)
         this.setState({user: res.data})
         this.refreshPlatforms();
      }catch(err){console.log(err)}
   }

   changePlatform = async (changedPlatform) =>{
      try{
         let { userId } = this.props.match.params;
         let platformId = changedPlatform._id;
         const response = await axios.patch(`/api/users/${userId}/platforms/${platformId}`, {
            platform: changedPlatform
         })
         await this.setState({user: response.data})
         this.refreshPlatforms();
      }catch(err){console.log(err)}
   }

   refreshPlatforms = () =>{
      this.setState({platforms: this.state.user.platforms});
   }

   render() {
      return (
         <Main>
            <hr/>
            <PlatformsBlocks>
               <PlatformsList
                  platforms={this.state.platforms}
                  deletePlatform={this.deletePlatform}
                  changePlatform={this.changePlatform}
                  addPlatform={this.addPlatform}
               />
            </PlatformsBlocks>
            <hr/>
         </Main>
      );
   }
}

export default PlatformsPage;