import connect from "../database/conn";

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

  static validateLoginDetail(req, res, next) {
    const {email, password} = req.body;
    if (!password || !email) {
      return res.status(400).json({
        status: "error",
        message: "Email or Password is required",
      });
    }

    const regEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);

    if (!regEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email address is invalid",
      });
    }

    next();
  }

  static existingUser(req, res, next) {
    const {email} = req.body;
    connect.query(
      `SELECT email FROM users WHERE email='${email}'`,
      (err, response) => {
        console.log(err, "err");
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return res.status(409).json({
            status: "error",
            message: "email address already exit",
          });
        }
        next();
      }
    );
  }

  static existingStory(req, res, next) {
    const storyId = req.params.id;
    connect.query(
      `SELECT storyid FROM storys WHERE storyid='${storyId}'`,
      (err, response) => {
        console.log(err, "err");
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length < 1) {
          return res.status(404).json({
            status: "error",
            message: "story id not found",
          });
        }
        next();
      }
    );
  }

  static validateStoryDetail(req, res, next) {
    const {title, description} = req.body;

    if (!title || !description) {
      return res.status(400).json({
        status: "error",
        message: "Title and description are required",
      });
    }

    next();
  }

  static validatePermission(req, res, next) {
    const { role } = req.decoded;

    if (role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "permission denied",
      });
    }

    next();
  }
}

export default CheckConflicts;
