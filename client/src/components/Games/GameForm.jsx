import React, { Component } from 'react';
import styled from 'styled-components';

const FormDiv = styled.div`
   background-color: gray;
   color: white;
   margin-top: 50px;
   
   .input{
      width: 70%;
      margin:0 auto;
      display: flex;
      justify-content: space-between;
   }

   .check{
      margin-right: 50%;
   }

   form{
      display: flex;
      flex-direction: column;
   }

   input{
      background: none;
      color: white;
      font-size: 16px;
      outline: none;
   }

   .submit{
         background-color: blue;
         border: none;
         width: 80px;
         margin: 0 auto;
         margin-top: 10px;
         border-radius: 20px;
   }
`

class GameForm extends Component {
   state={
      changedGame: {}
   }

   componentWillMount = () =>{
      this.setState({changedGame: this.props.game})
   }

   handleChange = (e) =>{
      const attribute = e.target.name;
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      const changedGame = {...this.state.changedGame};
      changedGame[attribute] = value;
      this.setState({changedGame});
   }

   handleSubmit = async (e) =>{
      try{
         e.preventDefault();
         await this.props.updateGame(this.state.changedGame);

      }catch(err){console.log(err)}
   }

   render() {
      return (
         <FormDiv>
               <div>
                  <form onSubmit={this.handleSubmit}>
                        <div className="input">
                           <label>Title: </label>
                           <input
                              name='name'
                              type="string"
                              onChange={this.handleChange}
                              value={this.state.changedGame.name}
                              required
                           />
                        </div>

                        <div className="input">
                           <label >Platform: </label>
                           <input
                              name='platform'
                              /* type='enum', list of users platforms */
                              type="string"
                              onChange={this.handleChange}
                              value={this.state.changedGame.platform}
                           />
                        </div>
                        
                        <div className="input">
                           <label htmlFor='owned'>Owned: </label>
                           <input
                              className="check"
                              id='owned'
                              name='owned'
                              type="checkbox"
                              onChange={this.handleChange}
                              defaultChecked={
                                 this.state.changedGame.owned ?
                                    true
                                 :
                                    false
                              }
                           />
                        </div>
                        
                        {
                              this.state.changedGame.owned ?
                                    <div>
                                          <div className="input">
                                                <label >Play Time: </label>
                                                <input
                                                      name='playTime'
                                                      type="number"
                                                      min='0.00'
                                                      step='.01'
                                                      onChange={this.handleChange}
                                                      value={this.state.changedGame.playTime}
                                                />
                                          </div>

                                          <div className="input">
                                                <label >Progress: </label>
                                                <input
                                                      name='progress'
                                                      type="number"
                                                      min='0.00'
                                                      step='.01'
                                                      max='100'
                                                      onChange={this.handleChange}
                                                      value={this.state.changedGame.progress}
                                                />
                                          </div>
                                    </div>
                              :
                              null
                        }
                        
                        <div className="input">
                           <label >Price: </label>
                           <input
                              name='price'
                              type="number"
                              min='0.00'
                              step='.01'
                              onChange={this.handleChange}
                              value={this.state.changedGame.price}
                           />
                        </div>

                        <input onSubmit={this.handleSubmit} className='submit' type="submit"/>
                  </form>
               </div>
         </FormDiv>
      );
   }
}

export default GameForm;