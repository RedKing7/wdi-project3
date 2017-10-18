import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GamesList from './GamesList';

const GamesMain = styled.div`
   text-align: center;
   font-family: Sans-serif;
`
const Tabs = styled.span`
   input{
      display: none;
   }
   label{
      background-color: blue;
      margin: 0 3px;
      padding: 5px;
      padding-bottom: 0;
      border-radius: 10px 10px 0 0;
   }
   input:checked+label{
      background-color: darkblue;
   }
`
const OpenTab = styled.div`
   background-color: darkblue;
   margin-top: 0;
   max-width: 1000px;
   margin: 0 auto;
   border-radius: 5px;
   h1{
      margin-top: 0;
   }
`

class GamesPage extends Component {
   state = {
      user: {},
      games: [],
      tab: 'My Games'
   }

   async componentWillMount(){
      try{
         let userId = this.props.match.params.userId;
         let res = await axios.get(`/api/users/${userId}`)
         await this.setState({user: res.data});
         let myGames = this.state.user.games.filter((game)=>{
            return game.owned
         })
         this.setState({games: myGames});
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
         this.changeTab(this.state.tab);
      }catch(err){console.log(err)}
   }

   refreshGames = () =>{
      this.setState({games: this.state.user.games});
   }

   handleRadio = (e) =>{
      this.changeTab(e.target.id);
   }

   changeTab = (tab) =>{ //also used to re-sort list after updating a game
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
            this.setState({tab: 'Completed'});
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
         
         default: console.log('something broke');
         }
   }

   render() {
      return (
         <GamesMain>
            <hr/>
            <Tabs>
               <input type='radio' name='tab' id='my-games' onChange={this.handleRadio} checked={this.state.tab === 'My Games'}/>
               <label htmlFor="my-games">My Games</label>

               <input type='radio' name='tab' id='need-to-finish' onChange={this.handleRadio} checked={this.state.tab === 'Need to Finish'}/>
               <label htmlFor="need-to-finish">Need to Finish</label>

               <input type='radio' name='tab' id='complete' onChange={this.handleRadio} checked={this.state.tab === 'Completed'}/>
               <label htmlFor="complete">Completed</label>

               <input type='radio' name='tab' id='want-to-play' onChange={this.handleRadio} checked={this.state.tab === 'Want to Play'}/>
               <label htmlFor="want-to-play">Want to Play</label>

               <input type='radio' name='tab' id='all' onChange={this.handleRadio} checked={this.state.tab === 'All Games'}/>
               <label htmlFor="all">All Games</label>
            </Tabs>
            <OpenTab>
               <GamesList
                  games={this.state.games}
                  deleteGame={this.deleteGame}
                  changeGame={this.changeGame}
                  tab={this.state.tab}
                  addGame={this.addGame}
               />
            </OpenTab>
            <hr/>

         </GamesMain>
      );
   }
}

export default GamesPage;