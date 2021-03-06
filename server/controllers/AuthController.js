import connect from "../database/conn";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";
import Token from './../utils/Token';

class AuthController {
  static userSignUp(req, res, next) {
    const userId = uuidv4();
    const {email, password, firstName, lastName, phone} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    connect.query(
      `INSERT INTO users (firstname, lastname, userid, email, password, role, phone)
        VALUES ('${firstName}', '${lastName}', '${userId}', '${email}', '${hashedPassword}', 'user', '${phone}')
      `,
      (err, response) => {
        console.log(err, "err");
        console.log(response, "result");
        const result = JSON.parse(JSON.stringify(response.rows));
        console.log(result, "result");

        if (result) {
          return res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "signup successful",
          });
        } else {
          return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "fail",
          });
        }
      }
    );
   
  }
  static userLogin(req, res) {
    const {email, password} = req.body;

    connect.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (err, response) => {
        console.log(err, "err");
        console.log(response, "result");
        const result = JSON.parse(JSON.stringify(response.rows));
        console.log(result, "result");
        console.log(result[0], "main result");

        if (result.length > 0) {
          const checkPassword = bcrypt.compareSync(
            password,
            result[0].password
          );

          if(checkPassword) {            
            const tokenData = {
              email,
              role: result[0].role,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              userId: result[0].userid,
              expiryTime: "500h"
            };
            const token = Token.generateToken(tokenData);
            return res.status(200).json({
              status: "success",
              statusCode: 200,
              message: "login successful",
              token,
            });
          } else {
            return res.status(400).json({
              status: "error",
              statusCode: 400,
              message: "Email or Password is wrong",
            });
          }
        
        } else {
          return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "Email or Password is wrong",
          });
        }
      }
    );
  }
}

export default AuthController;
