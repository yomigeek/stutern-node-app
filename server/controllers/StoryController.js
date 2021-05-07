import connect from "../database/conn";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";
import Token from "./../utils/Token";

class StoryController {
  static addStory(req, res) {
    const {title, description} = req.body;
    const storyId = uuidv4();
    const userId = req.decoded.userId;
    console.log(req.decoded, "dec");
    connect.query(
      `INSERT INTO storys (storyid, userid, title, description)
          VALUES ('${storyId}', '${userId}', '${title}', '${description}')
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
            data: {
              title,
              description,
            },
            message: "story added successfully",
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

  static updateStory(req, res) {
    const {title, description} = req.body;
    const storyId = req.params.id;
    console.log(storyId, "sid");
    connect.query(
      `UPDATE storys SET title = '${title}', description = '${description}' WHERE  storyid = '${storyId}'`,
      (err, response) => {
        console.log(err, "err");
        console.log(response, "result");
        const result = JSON.parse(JSON.stringify(response.rows));
        console.log(result, "result");

        if (result) {
          return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "story updated",
          });
        } else {
          return res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "story failed to update",
          });
        }
      }
    );
  }

  static deleteStory(req, res) {
    const storyId = req.params.id;
    console.log(storyId, "sid");
    connect.query(
      `DELETE FROM storys WHERE storyid = '${storyId}'`,
      (err, response) => {
        console.log(err, "err");
        const result = JSON.parse(JSON.stringify(response.rows));

        if (result) {
          return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "story deleted successfully",
          });
        } else {
          return res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "story failed to delete",
          });
        }
      }
    );
  }

  static searchStory(req, res) {
    const { keyword } = req.body;
    connect.query(
      `SELECT * FROM storys WHERE title LIKE '${keyword}%' LIMIT 1`,
      (err, response) => {
        console.log(err, "err");
        const result = JSON.parse(JSON.stringify(response.rows));
        console.log(result, 'res')
        if (result) {
          return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "search complete successfully",
            result,
          });
        } else {
          return res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "search failed",
          });
        }
      }
    );
  }
}

export default StoryController;
