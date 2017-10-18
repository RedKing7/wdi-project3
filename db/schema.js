const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      default: 'New Game'
   },
   owned: {
      type: Boolean,
      required: true,
      default: false
   },
   progress: {
      type: Number, //percentage
      min: 0,
      max: 100,
      default: 0
   },
   playTime: {
      type: Number,
      min: 0,
      default: 0
   },
   platform: {
      type: String,
   },
   price: {
      type: Number,
      min: 0
   }
})

const PlatformSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      default: 'New Platform'
   },
   price: {
      type: Number,
      min: 0,
      default: '0'
   },
   manufacturer: String
})

const UserSchema = mongoose.Schema({
   username: {
      type: String,
      unique: true
   },
   games: [GameSchema],
   platforms: [PlatformSchema]
})

const Game = mongoose.model('Game', GameSchema)
const User = mongoose.model('User', UserSchema)
const Platform = mongoose.model('Platform', PlatformSchema)

module.exports = {
  Game, User, Platform
}