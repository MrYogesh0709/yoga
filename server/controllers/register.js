import Yoga from "../models/register.js";
import StatusCodes from "http-status-codes";
import mongoose from "mongoose";
import moment from "moment/moment.js";
export const getAlluser = async (req, res) => {
  try {
    const user = await Yoga.find();
    res.status(StatusCodes.OK).json({ data: user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
export const register = async (req, res) => {
  const user = req.body;
  // console.log(req.body);
  const { firstName, lastName, email, batch, gender, phone, age } = user;
  try {
    const user = await Yoga.create({
      firstName,
      lastName,
      email,
      batch,
      gender,
      phone,
      age,
    });
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getBatch = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Yoga.findById(id);
    res.status(StatusCodes.OK).json(user);
    var myDatestring = user.createdAt;
    var newDate = moment(myDatestring);
    // console.log(newDate);
    var afterMonth = moment().add(1, "M");
    // console.log(afterMonth)
    if (newDate == afterMonth) {
      updateBatch;
    } else {
      return console.log("you can change batch after one month");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateBatch = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Post with that ${id}`);
    const user = await Yoga.findOneAndUpdate(id, post, {
      new: true,
    });
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
