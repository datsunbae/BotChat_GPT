const User = require("../models/userModel");

const userController = {
  changeInfo: async (req, res) => {
    let { newName, avatar } = req.body;
    const userID = req.user.id;

    if (!newName && !avatar) {
      return res.status(404).json("Name or avatar is not null");
    }

    if (!userID) {
      return res.status(400).json("Token is not valid");
    }

    try {
      const user = await User.findOne({ _id: userID });
      console.log("Check>>>" + user);

      if (!user) {
        return res.status(404).json("User not found");
      }

      if (!newName) {
        newName = user.name;
      }

      if (!avatar) {
        avatar = user.avatar;
      }

      const result = await User.findByIdAndUpdate(
        userID,
        { name: newName, avatar: avatar },
        { new: true }
      );

      const { password, refreshToken, ...other } = result._doc;
      return res.status(200).json(other);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = userController;
