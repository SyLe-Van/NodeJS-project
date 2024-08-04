const authMiddleware = require("../middleware/is-auth");
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
