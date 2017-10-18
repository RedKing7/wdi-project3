import React, { Component } from 'react';
import styled from 'styled-components';
import Game from './Game';

const Games = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`
const GamesListDiv = styled.div`
   width: 25%;
   margin: 5%;
   min-height: 300px;
   padding: 5%;

   background-color: gray;
   border-radius: 20px;

   display: flex;
   flex-direction: column;
   justify-content: space-between;

   h2{
      margin-top: 0;
   }
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
`
const GameSelection = styled.div`
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
const GameInfo = styled.div`
   height: 300px;
   width: 60%;
   margin: 5%;

   background-color: gray;
   border-radius: 20px;

   padding: 5%;
   background-color: gray;
   border-radius: 20px;
`

class GamesList extends Component {
   state={
      selectedGame: null
   }

   componentWillReceiveProps = () =>{
      this.setState({selectedGame: null});
   }

   handleDelete = (e) =>{
      let gameId = e.target.id;
      this.props.deleteGame(gameId);
      this.setState({selectedGame: null})
   }

   handleUpdate = async (game) =>{
      try{
         await this.props.changeGame(game);
         this.setState({selectedGame: game})
      }catch(err){console.log(err)}
   }

   handleRadio = (e) =>{
      let gameIndex = e.target.value;
      const game = this.props.games[gameIndex];
      this.setState({selectedGame: game})
   }

   render() {
      return (
         <Games>
            <GamesListDiv>
               <div>
                  <h2>{this.props.tab}</h2>
                  <hr/>
                  {
                     this.props.games.map((game, index) => {
                        return (
                           <GameSelection key={game._id}>
                              <input
                                 type='radio'
                                 name='game'
                                 key={game._id}
                                 id={`gameChoice${index}`}
                                 value={index}
                                 onClick={this.handleRadio}
                              />
                              <label htmlFor={`gameChoice${index}`}>{game.name}</label>
                           </GameSelection>
                        )
                     })
                  }
               </div>

               <button onClick={this.props.addGame}>New Game</button>
            </GamesListDiv>

            <GameInfo>
               {  
                  this.state.selectedGame ?
                     <Game
                        key={this.state.selectedGame._id}
                        game={this.state.selectedGame}
                        handleDelete={this.handleDelete}
                        handleChange={this.handleUpdate}
                     />
                  :
                     null
               }
            </GameInfo>
         </Games>
      );
   }
}

export default GamesList;