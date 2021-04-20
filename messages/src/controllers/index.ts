import { Request, Response } from "express";
import Message from "../models/message";

export const indexController = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const messages = await Message.find({ groupId });

  res.send(messages);
};
