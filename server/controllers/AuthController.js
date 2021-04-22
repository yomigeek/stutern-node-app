import connect from "../database/conn";
class AuthController {
  static userSignUp(req, res, next) {
    connect.query(
      `SELECT email FROM users WHERE email= '${'mm'}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return res.status(409).json({
            status: "error",
            statusCode: 409,
            message: "Email already exist" 
          });
        } else {
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Email doesnt exist" 
          });
        }
      }
    );
  }
  static userLogin(req, res) {
    res.status(200).json({
      message: "success",
    });
  }
}

export default AuthController;
