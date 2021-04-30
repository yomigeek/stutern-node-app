import connect from "../database/conn";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";
import Token from "./../utils/Token";

class StoryController {
  static addStory(req, res, next) {
    const {title, description} = req.body;
    console.log(req.decoded, 'dec')
    return res.status(201).json({
      status: "success",
      statusCode: 201,
      data: {
        title,
        description,
      },
      message: "story added successfully",
    });
  }
}

export default StoryController;
