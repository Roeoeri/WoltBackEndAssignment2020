const searchRestaurants = (restaurantList, keyword) =>{

    const filterFromNameDescAndTags = (restaurant) =>{
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

       return restaurantList.filter(filterFromNameDescAndTags)
}

module.exports = {
    searchRestaurants
}