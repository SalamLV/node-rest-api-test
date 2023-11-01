module.exports.saveODM = async function saveODM(obj, res) {
  try {
    await obj.save();
    res.status(201);
    return res.json(obj);
  } catch (error) {
    res.status = 500;
    return res.send(error);
  }
};
