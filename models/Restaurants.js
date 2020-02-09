const DATABASE = require('../config/config')
const db = require(`../${DATABASE}`)
const haversine = require('../services/haversineCalculator')

const restaurantList = db.restaurants
const searchDistance = 3

const searchRestaurants = (keyword, latitudeAtStart, longitudeAtStart) =>{

    const filterNearRestaurantsFromNameDescAndTags = (restaurant) =>{
        const name = restaurant.name.toUpperCase()
        const description = restaurant.description.toUpperCase()
        const tags = restaurant.tags
        const restaurantLatitude = restaurant.location[1]
        const restaurantLongitude = restaurant.location[0]

        const distance = haversine.distanceBetweenLocations(latitudeAtStart,longitudeAtStart,restaurantLatitude,restaurantLongitude)

        if(distance > searchDistance){
            return false
        }

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

       return restaurantList.filter(filterNearRestaurantsFromNameDescAndTags)
}

module.exports = {
    searchRestaurants
}