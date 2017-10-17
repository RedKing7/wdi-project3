import React, { Component } from 'react';
import GameForm from './GameForm';

class Game extends Component {
   state={
      game: {},
      editing: false
   }

   toggleEdit = () =>{
      let current = this.state.editing;
      this.setState({editing: !current});
   }

   updateGame = async (changedGame) => {
      try{
         await this.setState({game: changedGame})
         this.toggleEdit();
         this.props.handleChange(this.state.game)
      }catch(err){console.log(err)}
    }

   render() {
      return (
         <div>
            <hr/>
            {
               this.state.editing ?
                  <GameForm game={this.props.game} updateGame={this.updateGame}/>
               :
                  <div>
                     <h1>{this.props.game.name}</h1>
                     <div>
                        <div>Platform: {this.props.game.platform}</div>
                        {
                           this.props.game.owned ? 
                           <div>
                              <div>Play Time: {this.props.game.playTime}</div>
                              {
                                 this.props.game.progress === 100 ?
                                    <div>Complete!</div>
                                 :
                                    <div>Progress: {this.props.game.progress}%</div>
                              }
                           </div>
                           :
                           <div>
                              <div>Price: {this.props.game.price}</div>
                           </div>
                        }
                     </div>
                     <button id={this.props.game._id} onClick={this.props.handleDelete}>Delete</button>
                     <button onClick={this.toggleEdit}>Edit</button>
                  </div>
            }
         </div>
      );
   }
}

export default Game;