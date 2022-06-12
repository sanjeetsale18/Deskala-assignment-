const canditateServices = require("../Services/canditateServices");
const CanditateServicesInstance = new canditateServices();

const createCandidate = async (req, res) => {
  const result = await CanditateServicesInstance.create(req.body);
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await CanditateServicesInstance.delete(id);
  res.json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await CanditateServicesInstance.update(id, updateData);
  res.json(result);
};

module.exports = {
  createCandidate,
  deleteById,
  updateById,
};
