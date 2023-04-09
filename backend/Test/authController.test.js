const authController = require("../controllers/authController");
const User = require("../models/userModel");

describe("authController", () => {
  let res;

  beforeEach(() => {
    res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  //LOGIN
  it("should return status 404 if password not found", async () => {
    let req = {
      body: {
        email: "test@test.com",
      },
    };
    await authController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Email or passs not null");
  }, 50000);

  it("should return status 404 if email not found", async () => {
    let req = {
      body: {
        password: "123",
      },
    };
    await authController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Email or passs not null");
  }, 50000);

  it("should return status 404 if email not found", async () => {
    let req = {
      body: {
        email: "email@example.com",
        password: "123",
      },
    };

    jest.spyOn(User, "findOne").mockImplementation(null);
    await authController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Wrong username");
  }, 50000);
  //END LOGIN

  //REGISTER
  it("should return status 400 if email already exists", async () => {
    const req = {
      body: {
        name: "datsunbae",
        email: "datsunbae@gmail.com",
        password: "password",
      },
    };
    jest.spyOn(User, "findOne").mockImplementation(() => Promise.resolve({}));
    await authController.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("User already exists");
  }, 50000);
  //END REGISTER

  //FORGOT PASSWORD
  test("should return status 404 if email not found", async () => {
    const req = {
      body: {
        email: "test@gmail.com",
      },
    };
    jest.spyOn(User, "findOne").mockImplementation(null);
    await authController.sendRestPasswordLink(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Email is not found");
  }, 50000);

  test("should return status 404 if email is missing", async () => {
    const req = {
      body: {},
    };
    await authController.sendRestPasswordLink(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("Email is not null");
  }, 50000);
  //END FORGOT PASSWORD
});
