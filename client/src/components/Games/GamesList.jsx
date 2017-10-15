import React, { Component } from 'react';
import Game from './Game';

class GamesList extends Component {
   render() {
      return (
         <div>
            {
               this.props.games.map((game) => {
                  return (
                     <Game key={game._id} game={game}/>
                  )
               })
            }
         </div>
      );
   }
}

export default GamesList;