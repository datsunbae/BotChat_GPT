const authRouter = require("./authRouter");
const chatRouter = require("./chatRouter");
const messageRouter = require("./messageRouter");
const userRouter = require("./userRouter");

const router = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/chat", chatRouter);
  app.use("/api/message", messageRouter);
  app.use("/api/user", userRouter);
};

module.exports = router;
