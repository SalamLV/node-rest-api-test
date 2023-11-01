const { validationResult } = require("express-validator");
const helper = require("../utils/helper.util");

function receiptController(Receipt) {
  function getOne(req, res) {
    const returnReceipt = req.receipt.toJSON();
    return res.json(returnReceipt);
  }

  function getAll(req, res) {
    const query = {};

    Receipt.find(query)
      .then((receipts) => {
        const returnReceipts = receipts.map((item) => item.toJSON());
        return res.send(returnReceipts);
      })
      .catch((err) => {
        console.error(`Error from get all: ${err}`);
        res.status = 500;
        return res.send(JSON.stringify("Internal error"));
      });
  }

  async function post(req, res) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const receipt = new Receipt(req.body);
    helper.saveODM(receipt, res);
  }

  async function put(req, res) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { receipt } = req;

    receipt.number = req.body.number;
    receipt.title = req.body.title;
    receipt.price = req.body.price;
    receipt.date = new Date(req.body.date);

    helper.saveODM(receipt, res);
  }

  async function patch(req, res) {
    const { receipt } = req;

    if (req.body._id) {
      delete req.body._id;
    }

    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      receipt[key] = value;
    });

    helper.saveODM(receipt, res);
  }

  async function deleteOne(objModel, req, res) {
    try {
      await objModel.deleteOne({ _id: req.receipt._id });
      return res.sendStatus(204);
    } catch (error) {
      return res.send(error);
    }
  }

  return { getOne, getAll, post, put, patch, deleteOne };
}

module.exports = receiptController;
