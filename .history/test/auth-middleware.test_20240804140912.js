import authMiddleware from "../middleware/is-auth.js";
import jwt from "jsonwebtoken";
import { expect } from "chai";

describe("Auth Middleware", () => {
  it("should throw an error if no authorization header is present", () => {
    const req = {
      get: function (headerName) {
        return null;
      },
    };
    expect(() => authMiddleware(req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("shoule throw an error if the authorization header is only one string", () => {
    const req = {
      get: function (headerName) {
        return "asd";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield a userId after decoding the token", () => {
    const req = {
      get: function (headerName) {
        return "bearessss sdsfdffd";
      },
    };
    jwt.verify = function () {
      return { userId: "abc" };
    };
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
  });
});
