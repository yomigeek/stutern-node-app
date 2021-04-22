import connect from "../database/conn";
import {v4 as uuidv4} from "uuid";

class AuthController {
  static userSignUp(req, res, next) {
    const userId = uuidv4();
    const {email, password, firstname, lastname, phone} = req.body;

    connect.query(
      `INSERT INTO users (firstname, lastname, userid, email, password, role, phone)
        VALUES ('${firstname}', '${lastname}', '${userId}', '${email}', '${password}', 'user', '${phone}')
      `,
      (err, response) => {
        console.log(err, 'err')
        const result = JSON.parse(JSON.stringify(response.rows));

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
    // connect.query(
    //  `${'insert into users (firstname, lastname, userid, email, password, role, phone) ' +
    //     "values ('"}${'test'}', '${'test'}', '${req.body.name}','${req.body.name}','${'test'}','user', '${'test'}')`,
    //   (err, response) => {
    //     console.log(err, 'err')
    //                     console.log(response, 'res')
    //     const result = JSON.parse(JSON.stringify(response.rows));

    //     if (result) {
    //       return res.status(201).json({
    //         status: "success",
    //         statusCode: 201,
    //         message: "registered"
    //       });
    //     } else {
    //     return res.status(400).json({
    //         status: "error",
    //         statusCode: 400,
    //         message: "fail"
    //       });
    //     }
    //   }
    // );
  }
  static userLogin(req, res) {
    res.status(200).json({
      message: "success",
    });
  }
}

export default AuthController;
