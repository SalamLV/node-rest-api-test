function findReceipt(receiptModel) {
  return async (req, res, next) => {
    try {
      const receiptItem = await receiptModel.findById(req.params.receiptId);
      if (receiptItem) {
        req.receipt = receiptItem;
        return next();
      }
      return res.sendStatus(404);
    } catch (error) {
      console.error(error);
      res.status = 500;
      return res.send(error);
    }
  };
}

module.exports = findReceipt;
