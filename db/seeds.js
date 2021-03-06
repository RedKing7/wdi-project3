require('dotenv').config()
const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})
mongoose.connect('mongodb://heroku_917zjt2p:ak9vufa6o8pduledubuqkbssmb@ds035735.mlab.com:35735/heroku_917zjt2p')
mongoose.Promise = global.Promise

const { User, Game, Platform } = require('./schema')

const pc = new Platform({
   name: 'PC',
   price: 700,
   manufacturer: 'custom built'
})

const nSwitch = new Platform({
   name: 'Switch',
   price: 300,
   manufacturer: 'Nintendo'
})

const botw = new Game({
   name: 'The Legend of Zelda: Breath of the Wild',
   price: 60,
   platform: 'Switch',
   playTime: 90,
   progress: 95,
   owned: true
})

const battlefront = new Game({
   name: 'Battlefront II',
   price: 60,
   platform: 'PC'
})

const fallout = new Game({
   name: 'Fallout 4',
   playTime: 20,
   progress: 45,
   platform: 'PC',
   owned: true
})

const rory = new User({
   username: 'RJ',
   games: [fallout, botw, battlefront],
   platforms: [pc, nSwitch]
})

const steve = new User({
  username: 'Steve',
  platforms: [nSwitch]
})

const noname = new User({
  username: 'N/A',
  platforms: [pc]
})

User.remove({})
  .then(() => rory.save())
  .then(() => console.log('Successfully Saved rory'))
  .then(() => steve.save())
  .then(() => console.log('Successfully Saved steve'))
  .then(() => noname.save())
  .then(() => console.log('Successfully Saved noname'))
  .then(() => mongoose.connection.close())