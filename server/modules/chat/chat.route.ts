import express from "express";
import { getGroqChatCompletion } from "./chat.controller";

const chatRouter = express.Router();

chatRouter.route("/chat").get(getGroqChatCompletion);
export default chatRouter;
