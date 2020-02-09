const supertest = require('supertest')
const app = require('../app.js')

const api = supertest(app)

test('restaurant search results are returned as json', async () =>{
    await api
        .get('/restaurants/search?q=sushi&lat=60.17045&lon=24.93147')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('searching from restaurant names works', async () =>{
    const res = await api.get('/restaurants/search?q=social&lat=60.17045&lon=24.93147')

    expect(res.body[0].name).toBe("Social Burgerjoint Citycenter")
})

test('searching from restaurant description works' , async() =>{
    const res = await api.get('/restaurants/search?q=Asenne&lat=60.17045&lon=24.93147')

    expect(res.body[0].name).toBe("Social Burgerjoint Citycenter")
})

test('searching from restaurant tags works', async () =>{
    const res = await api.get('/restaurants/search?q=risotto&lat=60.17045&lon=24.93147')

    expect(res.body[0].name).toBe("Momotoko Citycenter")
})

test('searching with missing parameters returns bad request', async () =>{
    await api
    .get('/restaurants/search?=risotto&lat=60.17045&lon=24.93147')
    .expect(400)

    await api
    .get('/restaurants/search?q=risotto&lon=24.93147')
    .expect(400)

    await api
    .get('/restaurants/search?q=risotto&lat=22')
    .expect(400)
})
  

    
