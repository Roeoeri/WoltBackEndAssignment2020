
const express = require('express')
const app = express()
const restaurants = require('./restaurants.json')

const middleware = require( './utils/middleware.js')


app.get('/restaurants/search', (req,res) =>{
  if(middleware.queryContainsErrors(req,res)){
    return
  }
    res.send(`${req.query.q} ${(req.query.lat)} ${req.query.lon}`)
  
})

app.use(middleware.unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})