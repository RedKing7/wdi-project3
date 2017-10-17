import React, { Component } from 'react';
import styled from 'styled-components';
import Game from './Game';

const Games = styled.div`
   display: flex;
   flex-direction: column;
`

class GamesList extends Component {
   handleDelete = (e) =>{
      let gameId = e.target.id;

      this.props.deleteGame(gameId);
   }

   handleUpdate = async (game) =>{
      this.props.changeGame(game);
   }

   render() {
      return (
         <Games>
            {
               this.props.games.map((game) => {
                  return (
                     <Game
                        key={game._id}
                        game={game}
                        handleDelete={this.handleDelete}
                        handleChange={this.handleUpdate}
                     />
                  )
               })
            }
         </Games>
      );
   }
}

export default GamesList;