"use strict";
const express = require("express");
const { body } = require("express-validator");
const receiptController = require("../controllers/receiptController");
const middlewareFindReceipt = require("../middleware/findReceipt");

const taskValidatePostPut = [
  body("number").notEmpty().withMessage("The number is required"),
  body("number")
    .isNumeric()
    .withMessage("The number should contain numeric value"),
  body("title").notEmpty().escape().withMessage("The title is required"),
  body("price").notEmpty().withMessage("The price is required"),
  body("date").notEmpty().withMessage("The date is required"),
  body("date").isDate().withMessage("The date should be in format YYYY-MM-DD"),
];

function routes(Receipt) {
  const receiptRouter = express.Router();
  const controller = receiptController(Receipt);

  /**
   *  Implementing CRUD
   */

  receiptRouter.get("/receipts", (req, res) => {
    // #swagger.tags = ['Receipt']
    controller.getAll(req, res);
  });

  receiptRouter.post("/receipts", taskValidatePostPut, (req, res) => {
    // #swagger.tags = ['Receipt']
    controller.post(req, res);
  });

  // Middleware per Item path parameter
  receiptRouter.use("/receipts/:receiptId", middlewareFindReceipt(Receipt));

  receiptRouter
    .route("/receipts/:receiptId")
    .get((req, res) => {
      // #swagger.tags = ['Receipt']
      controller.getOne(req, res);
    })
    .put(taskValidatePostPut, (req, res) => {
      // #swagger.tags = ['Receipt']
      controller.put(req, res);
    })
    .patch((req, res) => {
      // #swagger.tags = ['Receipt']
      controller.patch(req, res);
    })
    .delete((req, res) => {
      // #swagger.tags = ['Receipt']
      controller.deleteOne(Receipt, req, res);
    });

  return receiptRouter;
}

module.exports = routes;
