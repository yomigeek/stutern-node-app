import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Token {
  /**
   * @description Method to generate token
   *
   * @param {Object} user
   *
   * @return {String} Returned token
   */
  static generateToken(tokenData) {
    return jwt.sign(
      tokenData,
      process.env.SECRET,
      {
        expiresIn: tokenData.expiryTime
      }
    );
  }

  static verifyToken(req, res, next) {
      const token = req.body.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
          if (error) {
            return res.status(401).send({
              status: 'unauthorized',
              statusCode: 401,
              error
            });
          }
          req.decoded = decoded;
          return next();
        });
      } else {
        return res.status(401).send({
          status: 'unauthorized',
          statusCode: 401,
          message: 'Unauthorized Access! You are not allowed to access this resource.',
        });
      }
  }
}
export default Token;
