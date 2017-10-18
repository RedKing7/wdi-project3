import React, { Component } from 'react';
import styled from 'styled-components';
import GameForm from './GameForm';

const GameDiv = styled.div`
   input:hover{
      background-color: blue;
   }
`

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
         await this.props.handleChange(this.state.game)
         this.forceUpdate();
      }catch(err){console.log(err)}
    }

   render() {
      return (
         <div>
            {
               this.state.editing ?
                  <GameForm game={this.props.game} updateGame={this.updateGame}/>
               :
                  <div>
                     <h1>{this.props.game.name}</h1>
                     <hr/>
                     <div>
                        <div>Platform: {this.props.game.platform}</div>
                        {
                           this.props.game.owned ? 
                           <div>
                              <div>Owned</div>
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
                              <div>Not Owned</div>
                              <div>Price: ${this.props.game.price}</div>
                           </div>
                        }
                     </div>
                     <div className='buttons'>
                        <button id={this.props.game._id} onClick={this.props.handleDelete}>Delete</button>
                        <button onClick={this.toggleEdit}>Edit</button>
                     </div>
                  </div>
            }
         </div>
      );
   }
}

export default Game;