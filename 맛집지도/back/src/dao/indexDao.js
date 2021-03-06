const { pool } = require("../../config/database");

//์๋น ์กฐํ
exports.selectRestaurants = async function (connection, category) {
  const selectAllRestaurantsQuery = `SELECT title,address,category, videoUrl From FoodMap.Restaurants where status = 'A';`;
  const selectCategorizedRestaurantsQuery=`select title,address,category, videoUrl From FoodMap.Restaurants where status = 'A' and category = ? ;`;
  
  const Params = [category];

  const Query = category
    ? selectCategorizedRestaurantsQuery
    : selectAllRestaurantsQuery

  const rows = await connection.query(Query, Params);
  return rows;
};

