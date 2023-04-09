const chatController = require("../controllers/chatController");
const Chat = require("../models/chatModel");

describe("chatController", () => {
  let res;

  beforeEach(() => {
    res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  //CHAT
  it("should create a new chat and return it with status 200", async () => {
    const req = {
      body: {
        chatName: "Test Chat",
      },
      user: {
        id: "testUserId",
      },
    };
    const newChat = {
      _id: "testChatId",
      chatName: "Test Chat",
      user: "testUserId",
    };
    jest.spyOn(Chat, "create").mockResolvedValueOnce(newChat);

    await chatController.createChat(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(newChat);
    expect(Chat.create).toHaveBeenCalledWith({
      chatName: "Test Chat",
      user: "testUserId",
    });
  });

  it("should return status 500 and error message when an error occurs", async () => {
    const req = {
      body: {
        chatName: "Test Chat",
      },
      user: {
        id: "testUserId",
      },
    };

    const error = "Internal server error";
    jest.spyOn(Chat, "create").mockRejectedValueOnce(error);

    await chatController.createChat(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(error);
  });
  //END CHAT
});
