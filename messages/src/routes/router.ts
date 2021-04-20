import express from "express";
import { indexController } from "../controllers";

const router = express.Router();

router.get("/api/messages/:groupId", indexController);

export default router;
