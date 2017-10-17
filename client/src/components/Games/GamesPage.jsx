import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GamesList from './GamesList';
// import GameForm from './GameForm';

const GamesMain = styled.div`
   text-align: center;
   font-family: Sans-serif;
`
const Games = styled.div`
   display: flex;
   flex-direction: column;
`

class GamesPage extends Component {
   state = {
      user: {},
      games: [],
      tab: 'All Games'
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

   changeTab = (e) =>{
      const tab = e.target.id;
      switch(tab){
         case 'my-games':
            let myGames = this.state.user.games.filter((game)=>{
               return game.owned
            })
            this.setState({games: myGames});
            this.setState({tab: 'My Games'})
            break;
         case 'need-to-finish':
            let ntfGames = this.state.user.games.filter((game)=>{
               return (game.owned && (game.progress < 100));
            })
            this.setState({games: ntfGames});
            this.setState({tab: 'Need to Finish'});
            break;

         case 'complete':
            let completeGames = this.state.user.games.filter((game)=>{
                  return game.progress === 100;
            })
            this.setState({games: completeGames});
            this.setState({tab: 'Complete'});
            break;
            
         case 'want-to-play':
            let wtpGames = this.state.user.games.filter((game)=>{
               return !game.owned;
            })
            this.setState({games: wtpGames});
            this.setState({tab: 'Want to Play'});
            break;

         case 'all':
            this.setState({games: this.state.user.games})
            this.setState({tab: 'All Games'});
            break;
         }
   }

   render() {
      return (
         <GamesMain>
            <h1>Games</h1>
            <hr/>

            <span>
               <button onClick={this.changeTab} id='my-games'>My Games</button>
               <button onClick={this.changeTab} id='need-to-finish'>Need to Finish</button>
               <button onClick={this.changeTab} id='complete'>Completed</button>
               <button onClick={this.changeTab} id='want-to-play'>Want to Play</button>
               <button onClick={this.changeTab} id='all'>All Games</button>
            </span>
            <Games>

            </Games>
            <h1>{this.state.tab}</h1>
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