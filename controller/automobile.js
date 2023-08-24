const { packageValidation } = require("../validation/automobile");
const {
  sendAutomobileDetails: uploadAuto,
  getAllAutomobile: allAuto,
  countAutomobile: countAuto,
  deleteAutomobile: delAuto,
  automobileDetailById,
} = require("../database/automobile");

const { initializePaystackTransaction } = require("../utils/payment");

const uploadedAutoMobile = async (req, res) => {
  req.body.sellerId = req.user.id; //pass in seller Id
  try {
    await packageValidation(req.body);
    await uploadAuto(req.body);

    res.status(201).json({ msg: "successful" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
};

const getAllAutomobile = async (req, res) => {
  try {
    const user = await allAuto();

    res.status(200).json({ msg: user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getParticularAutomobile = async (req, res) => {
  try {
    const { id } = req.params;
    let packages = await automobileDetailById(id);
    res.status(200).json({ msg: packages[0] });
  } catch (err) {
    throw Error(err.message);
  }
};

const deleteAutomobile = async (req, res) => {
  try {
    const { id } = req.params;
    await delAuto(id);
    res.status(200).json({ msg: "deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const automobilePayment = async (req, res) => {
  try {
    //initialize payment
    let initialize_payment = await initializePaystackTransaction(req, 20000);

    if (initialize_payment.data != undefined) {
      // await setPackageReference(initialize_payment.data.reference, packagesId);
    } else {
      throw new Error("Error in making payment");
    }

    res.status(201).json({ msg: initialize_payment.data.authorization_url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  uploadedAutoMobile,
  getAllAutomobile,
  getParticularAutomobile,
  deleteAutomobile,
  automobilePayment,
};
