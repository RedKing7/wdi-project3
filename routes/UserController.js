const express = require('express')
const router = express.Router()
const { User } = require('../db/schema')

//get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (err) {
    res.send(err)
  }
})

//find one user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    res.send(err)
  }
})

//add new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body.user)
    const saved = await newUser.save()
    res.json(saved)
  } catch (err) {
    res.send(err)
  }
})

//delete user
router.delete('/:id', async (req, res) => {
    try{
      let userId = req.params.id;
      let deleted = await User.findByIdAndRemove(userId)
      res.json(deleted)
    }catch(err){console.log(err)}
 })

module.exports = router