import React, { Component } from 'react';
import PlatformsList from './PlatformsList';
import axios from 'axios';
import styled from 'styled-components';

const Main = styled.div`
   width: 100%;
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
         <div>
            <h1>Platforms</h1>
            <hr/>

            {/* tab selector goes here */}

            <h1>All Platforms</h1>
            <PlatformsList
               platforms={this.state.platforms}
               deletePlatform={this.deletePlatform}
               changePlatform={this.changePlatform}
            />
            <hr/>

            <button onClick={this.addPlatform}>New Platform</button>
         </div>
      );
   }
}

export default PlatformsPage;