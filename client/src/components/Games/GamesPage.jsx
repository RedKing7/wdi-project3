import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GamesList from './GamesList';
// import GameForm from './GameForm';

const GamesMain = styled.div`
   text-align: center;
   font-family: Sans-serif;
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
         await this.setState({user: res.data});
         this.refreshGames();
      }catch(err){console.log(err)}
   }

   addGame = async () =>{
      try{
         let userId = this.props.match.params.userId;
         let response = await axios.post(`/api/users/${userId}/games`);
         await this.setState({user: response.data})
         this.refreshGames();
      }catch(err){console.log(err)}
   }

   deleteGame = async (id) =>{
      try{
         let { userId } = this.props.match.params
         let res = await axios.delete(`/api/users/${userId}/games/${id}`)
         this.setState({user: res.data})
         this.refreshGames();
      }catch(err){console.log(err)}
   }

   changeGame = async (changedGame) =>{
      try{
         let { userId } = this.props.match.params;
         let gameId = changedGame._id;
         const response = await axios.patch(`/api/users/${userId}/games/${gameId}`, {
            game: changedGame
         })
         await this.setState({user: response.data})
         this.refreshGames();
      }catch(err){console.log(err)}
   }

   refreshGames = () =>{
      this.setState({games: this.state.user.games});
   }

   render() {
      return (
         <GamesMain>
            <h1>Games</h1>
            <hr/>

            {/* tab selector goes here */}

            <h1>All Games</h1>
            <GamesList
               games={this.state.games}
               deleteGame={this.deleteGame}
               changeGame={this.changeGame}
            />
            <hr/>

            <button onClick={this.addGame}>New Game</button>
         </GamesMain>
      );
   }
}

export default GamesPage;