import connect from "../database/conn";
class AuthController {
  static userSignUp(req, res, next) {
    connect.query(
     `${'insert into users (firstname, lastname, userid, email, password, role, phone) ' +
        "values ('"}${'test'}', '${'test'}', '${'test'}','${'test'}','${'test'}','user', '${'test'}')`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "registered" 
          });
        } else {
        return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "fail" 
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
