require("should");

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app.js");

const Receipt = mongoose.model("Receipt");
const agent = request.agent(app);

let id;

describe("Receipt Crud Test", () => {
  it("Should allow a receipt to be posted, return back the new object and its _id", (done) => {
    const receiptPost = {
      number: 14,
      title: "T-shirt",
      price: 20.0,
      date: "2023-09-01",
    };

    agent
      .post("/api/receipts/")
      .send(receiptPost)
      .expect(201)
      .end((err, results) => {
        if (err) return done(err);

        results.body.should.have.property("_id");
        if (results.body._id) {
          id = results.body._id;
          console.log(`The ID created is ${id}`);
        }
        return done();
      });
  }).timeout(5000);

  it("Should allow to get one Item", (done) => {
    agent
      .get(`/api/receipts/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, results) => {
        if (err) return done(err);

        results.body.should.have.property("_id");
        results.body._id.should.equal(id);

        return done();
      });
  });

  it("Should allow to patch 'title'", (done) => {
    const title = "Groceries";

    agent
      .patch(`/api/receipts/${id}`)
      .set("Accept", "application/json")
      .send({ title: title })
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, results) => {
        if (err) return done(err);

        results.body.should.have.property("_id");
        results.body._id.should.equal(id);
        results.body.title.should.equal(title);
        console.log(`Received title is: ${results.body.title}`);

        return done();
      });
  });

  describe("Validation Test", () => {
    it("Do not allow to post empty title", (done) => {
      const receiptPost = {
        number: 14,
        title: "",
        price: 20.0,
        date: "2023-09-01",
      };

      agent
        .post("/api/receipts/")
        .send(receiptPost)
        .expect(400)
        .end((err, results) => {
          if (err) return done(err);

          return done();
        });
    }).timeout(5000);
  });

  // afterEach((done) => {
  //   // Run after test case in this block
  //   done();
  // });

  after(async () => {
    await Receipt.deleteOne({ _id: id });
    await mongoose.connection.close();
    await app.server.close();
  });
});
