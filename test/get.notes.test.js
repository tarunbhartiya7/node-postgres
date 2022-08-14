const supertest = require("supertest");
const app = require("../app");

describe("Get notest", () => {
  it("should get all the notes", (done) => {
    supertest(app)
      .get("/api/notes")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
        done();
      });
  });
});
