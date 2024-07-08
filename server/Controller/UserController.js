import { User } from "../Model/User_Model.js";

export const GetAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.send( user );
  } catch (err) {
    res.status(500)
    res.send(err.message);  }
};

export const GetUserById = async (req, res) => {
  try {
    // const userId = Number(req.params.id);
    const userId = req.params.id;
    const users = await User.findOne({Id:userId});
    res.send(users );
  } catch (err) {
    res.send(err.message);
  }
};

export const CreateUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.create(data);

    res.send(user);
  } catch (err) {
    res.status(500)
    res.send(err.message);
  }
};

export const UpdateUser = async (req, res) => {
  try {
    // Get the id off the URL
    const Qry = { Id: Number(req.params.id) };
    const vals = {
      email: req.body.email,
      age: req.body.age,
      name: req.body.name,
      gender: req.body.gender,
    };
  
    const user = await User.findOneAndUpdate(Qry, { $set: vals })

    res.send(user );
  } catch (err) {
    res.status(500)
    res.send(err.message);  }
};

export const deleteUser = async (req, res) => {
  try {
    // Get id off url
    const userId =Number(req.params.id);

    // Delete the record
    await User.deleteOne({ Id: userId });

    // Respond
    res.send({ success: "Record deleted" });
  } catch (err) {
    res.status(500)
    res.send(err.message);  }
};
