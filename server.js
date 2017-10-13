require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;
connection.on('connected', ()=>{console.log('Mongoose connected successfully')})
connection.on('error', (err)=>{console.log('mongoose connection error: ', err)})

app.use(bodyParser.json());
// app.get('/', (req,res)=>{
//    res.send('<h1>Hello, World!</h1>')
// })

app.use(express.static(__dirname + '/client/build/'));
app.get('/', (req, res)=>{
   res.sendFile(__dirname+'/client/build/index.html');
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
   console.log('Express server running on port ', PORT);
})