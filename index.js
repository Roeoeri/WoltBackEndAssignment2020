
const express = require('express')
const app = express()
const db = require('./restaurants.json')

const middleware = require( './utils/middleware.js')
const searchTool = require('./services/searchTool.js')



app.get('/restaurants/search', (req,res) =>{
  if(middleware.queryContainsErrors(req,res)){
    return
  }

  const keyword = req.query.q.toUpperCase()
  const lat = req.query.lat
  const lon = req.query.lon

  const restaurantsList = db.restaurants
  const result = searchTool.searchRestaurants(restaurantsList,keyword,lat,lon)

  res.send(result)
  
})

app.use(middleware.unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})