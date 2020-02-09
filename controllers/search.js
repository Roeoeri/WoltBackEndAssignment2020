const searchRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Restaurants = require('../models/Restaurants')


searchRouter.get('/restaurants/search', (req,res) =>{
    if(middleware.queryContainsErrors(req,res)){
      return
    }
    const keyword = req.query.q.toUpperCase()
    const lat = req.query.lat
    const lon = req.query.lon
  
    const result = Restaurants.searchRestaurants(keyword,lat,lon)
  
    res.json(result)
  })

  module.exports = searchRouter



