const {
  registerUser,
  getUser,
  getUsers,
  getUserByEmail,
  updateUserToken,
  countPackage: userCountPackage,
  deleteUser,
} = require("../database/auth");

const { countPackage: sellCountPackage } = require("../database/blog");
const {
  countPackage: logisticsCountPackage,
} = require("../database/automobile");
const jwt = require("jsonwebtoken");

const RegisterNewUser = async (req, res) => {
  try {
    const { password } = req.body;
    //     let encryptedPassword = await bcrypt.hash(password, 10);
    let encryptedPassword = password;
    //PASSWORD ENCRYPTION
    req.body.password = encryptedPassword;
    let new_user_id = await registerUser(req.body);

    let [user] = await getUser(new_user_id);

    //CREATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        telephone: user.telephone,
        address: user.address,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    //UPDATE USER WITH TOKEN
    await updateUserToken(user.id, token);
    //GET UPDATED DATA FROM DB
    let [updatedUser] = await getUser(user.id);
    delete updatedUser.password;
    //SEND UPDATED DATA FROM DB
    res.status(201).json({ msg: updatedUser.token });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Validate User Input
    if (!(email && password)) {
      res.status(400).json({ msg: "Please input all field" });
    } else {
      let [user] = await getUserByEmail(email);

      if (user && password == user.password) {
        //CREATE TOKEN
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            telephone: user.telephone,
            address: user.address,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );
        //UPDATE USER WITH TOKEN
        await updateUserToken(user.id, token);
        //GET UPDATED DATA FROM DB
        let [updatedUser] = await getUser(user.id);
        delete updatedUser.password;
        //SEND UPDATED DATA FROM DB
        res.status(200).json({ msg: updatedUser.token });
      } else {
        res.status(400).json({ msg: "Email or password is not correct" });
      }
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let packages = await getUser(id);
    delete packages[0].password;
    delete packages[0].token;
    res.status(200).json({ msg: packages[0] });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ msg: users });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const countPackages = async (req, res) => {
  try {
    const no_of_user_package = await userCountPackage();
    const no_of_sell_package = await sellCountPackage();
    const no_of_logistics_package = await logisticsCountPackage();
    res.status(200).json({
      msg: {
        no_of_logistics_package,
        no_of_sell_package,
        no_of_user_package,
      },
    });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
const delUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({ msg: "user account deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  RegisterNewUser,
  LoginUser,
  getUserById,
  allUsers,
  countPackages,
  delUser,
};
