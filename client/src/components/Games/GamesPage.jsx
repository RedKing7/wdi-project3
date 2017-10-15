import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GamesList from './GamesList';

const GamesMain = styled.div`
   text-align: center;
   font-family: Sans-serif;
`
const Games = styled.div`
   display: flex;
   flex-direction: row;
`

class GamesPage extends Component {
   state = {
      user: {},
      games: []
   }

   async componentWillMount(){
      try{
         let userId = this.props.match.params.userId;
         let res = await axios.get(`/api/users/${userId}`)
         console.log(res.data)
         await this.setState({user: res.data});
         await this.setState({games: res.data.games})
      }catch(err){console.log(err)}
   }

   render() {
      return (
         <GamesMain>
            <h1>Games</h1>
            <hr/>
            {/* tab selector goes here */}
            <h1>All Games</h1>
            <Games>
               <GamesList games={this.state.games}/>
            </Games>
            <hr/>
         </GamesMain>
      );
   }
}

export default GamesPage;