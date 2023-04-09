const User = require("../models/userModel");

const userController = {
  changeName: async (req, res) => {
    const { newName } = req.body;
    const userID = req.user.id;

    try {
      if (!newName) {
        return res.status(404).json("Name is not null");
      }

      if (!userID) {
        return res.status(400).json("Token is not valid");
      }

      User.findByIdAndUpdate(userID, { name: newName }, function (err, docs) {
        if (err) {
          return res.status(500).json(err);
        } else {
          const { password, refreshToken, ...other } = docs._doc;
          return res.status(200).json(other);
        }
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  changeAvatar: async (req, res) => {
    const { avatar } = req.body;
    const userID = req.user.id;

    try {
      if (!newName) {
        return res.status(404).json("Name is not null");
      }

      if (!userID) {
        return res.status(400).json("Token is not valid");
      }

      User.findByIdAndUpdate(userID, { avatar }, function (err, docs) {
        if (err) {
          return res.status(500).json(err);
        } else {
          const { password, refreshToken, ...other } = docs._doc;
          return res.status(200).json(other);
        }
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = userController;
