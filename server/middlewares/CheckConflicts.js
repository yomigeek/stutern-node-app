import connect from '../database/conn';

class CheckConflicts {
  static validateUserDetail(req, res, next) {
    const {password, phone, email} = req.body;

    if (!password || !phone || !email) {
      return res.status(400).json({
        status: "error",
        message: "Password, phone and email are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "password cannot be less than 6 characters",
      });
    }
    const regPhone = /^[0-9]*$/.test(phone);

    if (phone.length != 13 || !regPhone) {
      return res.status(400).json({
        status: "error",
        message: "phone number is invalid",
      });
    }

    const regEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);

    if (!regEmail) {
      return res.status(400).json({
        status: "error",
        message: "email address is invalid",
      });
    }

    next();
  }

  static existingUser(req, res, next) {
      const { email } = req.body;
      connect.query(
          `SELECT email FROM users WHERE email='${email}'`,
          (err, response) => {
              console.log(err, 'err')
              const result = JSON.parse(JSON.stringify(response.rows));
              if(result.length > 0) {
                return res.status(409).json({
                    status: "error",
                    message: "email address already exit",
                  });
              }
              next();
          }
      )
  }
}

export default CheckConflicts;
