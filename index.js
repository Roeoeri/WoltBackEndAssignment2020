
const express = require('express')
const searchRouter = require('./controllers/search')
const middleware = require('./utils/middleware')
const app = express()

app.get('/restaurants/search', searchRouter) 

app.use(middleware.unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})