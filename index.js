
const express = require('express')
const app = express()
const restaurants = require('./restaurants.json')

app.get('/', (req, res) => {
  res.send(restaurants)
})

app.get('/restaurants/search', (req,res) =>{
    res.send(`${req.query.q} ${req.query.lat} ${req.query.lon}`)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})