const supertest = require('supertest')
const app = require('../app.js')

const api = supertest(app)

test('restaurant search results are returned as json', async () =>{
    await api
        .get('/restaurants/search?q=sushi&lat=60.17045&lon=24.93147')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('searching from restaurant names works when restaurant is nearby', async () =>{
    const res = await api.get('/restaurants/search?q=social&lat=60.17045&lon=24.93147')

    expect(res.body[0].name).toBe("Social Burgerjoint Citycenter")
})

test('searching from restaurant description works when restaurant is nearby' , async() =>{
    const res = await api.get('/restaurants/search?q=Asenne&lat=60.17045&lon=24.93147')

    expect(res.body[0].name).toBe("Social Burgerjoint Citycenter")
})

test('searching from restaurant tags works when restaurant is nearby', async () =>{
    const res = await api.get('/restaurants/search?q=risotto&lat=60.17045&lon=24.93147')

    expect(res.body[0].name).toBe("Momotoko Citycenter")
})

test('search does not return restaurant which is more than 3km away', async() =>{
    const res = await api.get('/restaurants/search?q=social&lat=60.160712&lon=24.881404')

    expect(res.body.length).toBe(0)
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

test('searching with short query string returns bad request', async () =>{

    await api
    .get('/restaurants/search?q=&lat=22&lon=23.12312')
    .expect(400)
})

test('searching with invalid latitude or longitude returns bad request', async () =>{
    await api
        .get('/restaurants/search?q=social&lat=100.160712&lon=24.881404')
        .expect(400)
    
    await api
        .get('/restaurants/search?q=social&lat=-100.160712&lon=24.881404')
        .expect(400)
    
    await api
        .get('/restaurants/search?q=social&lat=-87.160712&lon=181.881404')
        .expect(400)

    await api
        .get('/restaurants/search?q=social&lat=-87.160712&lon=-191.881404')
        .expect(400)


})


  

    
