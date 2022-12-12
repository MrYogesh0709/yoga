import mongoose from "mongoose";
import validator from "validator";

const JobSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide firstname"],
      minlength: 3,
      maxlength: 8,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide lastname"],
      minlength: 3,
      maxlength: 8,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
    },
    age: {
      type: Number,
      min: [18, "Must be at least 18, got {VALUE}"],
      max: 65,
    },

    batch: {
      type: String,
      possibleValues: ["6-7AM", "7-8AM", "8-9AM", "5-6PM"],
    },
    gender: {
      type: String,
      possibleValues: ["male", "female"],
    },
    phone: {
      type: Number,
      length: 10,
      unique: true,
      required: [true, "please provide phone number"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("YOGA", JobSchema);
