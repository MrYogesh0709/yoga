import express from "express";
import {
  getAlluser,
  getBatch,
  register,
  updateBatch,
} from "../controllers/register.js";
const router = express.Router();

router.get("/", getAlluser);
router.post("/", register);
router.patch("/update/:id", updateBatch);
router.get("/:id", getBatch);

export default router;
