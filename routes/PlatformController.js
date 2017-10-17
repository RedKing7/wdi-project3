const express = require('express')
const router = express.Router({mergeParams: true})
const { User, Platform } = require('../db/schema')

//new platform
router.post('/', async (req, res) => {
   try{
      const newPlatform = new Platform()
      const user = await User.findById(req.params.userId)
      user.platforms.push(newPlatform)
      const saved = await user.save()
      res.json(saved)
   }catch(err){res.json(err)}
})

//edit platform
router.patch('/:id', async (req, res) => {
   try{
      const updatedPlatform = req.body.platform
      const user = await User.findById(req.params.userId)
      const platform = user.platforms.id(req.params.id)
      
      platform.name = updatedPlatform.name;
      platform.price = updatedPlatform.price;
      platform.manufacturer = updatedPlatform.manufacturer;

      const saved = await user.save()
      res.json(saved)
   }catch(err){res.json(err)}
})

//delete platform
router.delete('/:id', async (req, res) => {
   try{
      const user = await User.findById(req.params.userId)
      user.platforms.id(req.params.id).remove()
      const saved = await user.save()
      res.json(saved)
   }catch(err){res.json(err)}
})

module.exports = router