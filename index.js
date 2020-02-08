
const express = require('express')
const app = express()
const db = require('./restaurants.json')

const middleware = require( './utils/middleware.js')


app.get('/restaurants/search', (req,res) =>{
  if(middleware.queryContainsErrors(req,res)){
    return
  }

  const keyword = req.query.q.toUpperCase()
  console.log(keyword)

  const searchFromNameDescAndTags = (restaurant) =>{
    const name = restaurant.name.toUpperCase()
    const description = restaurant.description.toUpperCase()
    const tags = restaurant.tags

    let match = false

    if(name.includes(keyword)){
      match = true
    }

    if(description.includes(keyword)){
      match = true
    }

    tags.forEach(tag => {
      if(tag.toUpperCase().includes(keyword)){
        match = true
      }
    });
    return match
  }
  const result = db.restaurants.filter(searchFromNameDescAndTags)

  
  res.send(result)
  
})

app.use(middleware.unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})