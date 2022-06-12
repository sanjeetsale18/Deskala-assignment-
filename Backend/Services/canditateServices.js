const Canditate = require("../Model/canditateModel");

class canditateService {
  create = async (body) => {
    const newCanditate = new Canditate(body);
    const result = await newCanditate.save();
    return result;
  };

  delete = async (id) => {
    const result = await Canditate.findOneAndDelete({ id: id });
    return result;
  };

  update = async (id, updateData) => {
    const result = await Canditate.findOneAndUpdate(id, updateData, {
      new: true,
    });
    return result;
  };
}

module.exports = canditateService;
