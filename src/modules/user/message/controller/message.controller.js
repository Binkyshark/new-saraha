import messageModel from "../message.model.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { sender, receiver, text } = req.body;

    if (!sender || !receiver || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const message = await messageModel.create({ sender, receiver, text });
    return res.status(201).json({ message: "Message sent", data: message });

  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await messageModel.find();

    if (messages.length === 0) {
      return res.status(204).send(); // No Content
    }

    return res.status(200).json({ message: "All messages", data: messages });

  } catch (err) {
    next(err);
  }
};
