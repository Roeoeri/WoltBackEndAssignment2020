const distanceBetweenLocations = (lat1,lon1,lat2,lon2) =>{
    const r = 6371

    let dLat = convertToRadians(lat2-lat1)
    let dLon = convertToRadians(lon2-lon1)

    lat1 = convertToRadians(lat1)
    lat2 = convertToRadians(lat2)

    let a = Math.pow(Math.sin(dLat/2),2) + Math.pow(Math.sin(dLon/2),2)*Math.cos(lat1)* Math.cos(lat2)
    let c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return r*c
    
}


const convertToRadians = (degrees) =>{
    return degrees*(Math.PI/180.0)
}

module.exports = {
    distanceBetweenLocations
}