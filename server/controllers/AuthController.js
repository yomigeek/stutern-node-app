class AuthController {
  static userSignUp(req, res, next) {
    res.status(200).json({
      status: "success",
      message: "signup sucessful",
      data: req.body
    });
  }
  static userLogin(req, res) {
    res.status(200).json({
        message: "success",
    })
  }
}

export default AuthController;
