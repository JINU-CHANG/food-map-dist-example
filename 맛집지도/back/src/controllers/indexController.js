const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");
const indexDao = require("../dao/indexDao");

// 식당 선택하기 코드
exports.readRestaurants = async function (req, res) {
  const { category } = req.query;
  console.log(category);

  //카테고리 값이 넘어 왔다면, 유효한 값인지 체크
  if(category) {
    const validCategory = [
      "한식",
      "중식",
      "일식",
      "양식",
      "분식",
      "구이",
      "회/초밥",
      "기타",
    ];
    if (!validCategory.includes(category)) {
      return res.send({
        isSuccess: false,
        code: 400, // 요청 실패시 400번대 코드
        message: "유효한 카테고리가 아닙니다.",
    });
  }
  }
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectRestaurants(connection, category);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "식당 조회 성공",
      });
    } catch (err) {
      logger.error(`readResturants Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`readResturants DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};
