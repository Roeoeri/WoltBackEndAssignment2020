require('dotenv').config();

let DATABASE = 'restaurants.json';

if (process.env.NODE_ENV === 'test') {
  DATABASE = 'testrestaurants.json';
}
module.exports = DATABASE;
