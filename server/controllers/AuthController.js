import connect from "../database/conn";
class AuthController {
  static userSignUp(req, res, next) {
    // insert data
    connect.query(
      `${
        "insert into users (firstname, lastname, userId, email, password, role, phone) " +
        "values ('"
      }${"formattedFirstName"}', '${"formattedLastName"}', '${"userId"}','${"formattedEmail"}','','user', '')`,
      (err, response) => {
        console.log(response, 'rr')
        const result = JSON.parse(JSON.stringify(response.rows));
        if (response.rows.length > 0) {
          return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "signup successful",
          });
        }
      }
    );
    // res.status(200).json({
    //   status: "success",
    //   message: "signup sucessful",
    //   data: req.body
    // });
  }
  static userLogin(req, res) {
    res.status(200).json({
      message: "success",
    });
  }
}

export default AuthController;
