import React, { Component } from 'react';
import styled from 'styled-components';
import GameForm from './GameForm';

const GameDiv = styled.div`
   height: 275px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
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
   .edit{
      margin-right: 25%;
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
                  <GameDiv>
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
                     </div>
                     <div>
                        <button className='edit' onClick={this.toggleEdit}>Edit</button>
                        <button id={this.props.game._id} onClick={this.props.handleDelete}>Delete</button>
                     </div>
                  </GameDiv>
            }
         </div>
      );
   }
}

export default Game;