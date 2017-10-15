import React, { Component } from 'react';

class Game extends Component {
   render() {
      return (
         <div>
            <hr/>
            <h1>{this.props.game.name}</h1>
            <ul>
               <li>Platform: {this.props.game.platform}</li>
               <li>Play Time: {this.props.game.playTime}</li>
               {
                  this.props.game.progress === 100 ?
                     <li>Complete!</li>
                  :
                     <li>Progress: {this.props.game.progress}%</li>
               }
               {
                  this.props.game.owned ?
                     <li>Owned</li>
                  :
                     <li>Price: {this.props.game.price}</li>
               }
            </ul>
         </div>
      );
   }
}

export default Game;