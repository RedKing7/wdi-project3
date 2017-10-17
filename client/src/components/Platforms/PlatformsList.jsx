import React, { Component } from 'react';
import Platform from './Platform';
import styled from 'styled-components';

class PlatformList extends Component {
   handleDelete = (e) =>{
      let platformId = e.target.id;

      this.props.deletePlatform(platformId);
   }

   handleUpdate = async (platform) =>{
      this.props.changePlatform(platform);
   }

   render() {
      return (
         <div>
            {
               this.props.platforms.map((platform) => {
                  return (
                     <Platform
                        key={platform._id}
                        platform={platform}
                        handleDelete={this.handleDelete}
                        handleChange={this.handleUpdate}
                     />
                  )
               })
            }
         </div>
      );
   }
}

export default PlatformList;