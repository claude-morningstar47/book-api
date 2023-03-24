const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Books", () => {
  describe("GET /api/books", () => {
    // Test to get all books record
    it("should get all books record", (done) => {
      chai
        .request(app)
        .get("/api/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });

    // Test to get single book record
    it("should get a single book record", (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/books/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
