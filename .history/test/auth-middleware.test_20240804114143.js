import authMiddleware from "../middleware/is-auth.js";
import { expect } from "chai";

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
  expect(() => authMiddleware(req, {}, () => {})).to.throw(
    "Not authenticated."
  );
});
