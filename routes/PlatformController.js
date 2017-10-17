const express = require('express')
const router = express.Router({mergeParams: true})
const { User, Game } = require('../db/schema')

//new game
router.post('/', async (req, res) => {
   try{
      const newGame = new Game()
      const user = await User.findById(req.params.userId)
      user.games.push(newGame)
      const saved = await user.save()
      res.json(saved)
   }catch(err){res.json(err)}
})

//edit game
router.patch('/:id', async (req, res) => {
   try{
      const updatedGame = req.body.game
      const user = await User.findById(req.params.userId)
      const game = user.games.id(req.params.id)
      
      game.name = updatedGame.name;
      game.owned = updatedGame.owned;
      game.progress = updatedGame.progress;
      game.playTime = updatedGame.playTime;
      game.platform = updatedGame.platform;
      game.price = updatedGame.price;

      const saved = await user.save()
      res.json(saved)
   }catch(err){res.json(err)}
})

//delete game
router.delete('/:id', async (req, res) => {
   try{
      const user = await User.findById(req.params.userId)
      user.games.id(req.params.id).remove()
      const saved = await user.save()
      res.json(saved)
   }catch(err){res.json(err)}
})

module.exports = router