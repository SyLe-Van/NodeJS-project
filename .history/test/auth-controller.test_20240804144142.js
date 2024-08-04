import { expect } from "chai";
import Sinon from "sinon";
import * as AuthController from "../controllers/auth.js";
import User from "../models/user.js";

describe("Auth Controller - Login", function () {
  it("should throw an error with code 500 if accessing the database fails", function () {
    Sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "syle@gmail.com",
        password: "12345678",
      },
    };

    AuthController.getLogin(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
    });
    User.findOne.restore();
  });
});
