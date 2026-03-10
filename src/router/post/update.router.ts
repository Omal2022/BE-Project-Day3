import express from "express";
import { updateById } from "../../controller/update.controller.js";

const router = express.Router();

router.post("/post/update/:id", updateById);

export default router