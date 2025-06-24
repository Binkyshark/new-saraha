import messageModel from "../message.model.js"; 
 // صححي المسار لو حطيتيه في مكان مختلف

export const sendMessage = async (req, res, next) => {
  try {
    const { sender, receiver, text } = req.body;
    const message = await messageModel.create({ sender, receiver, text });
    res.status(201).json({ message: "Message sent", data: message });
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await messageModel.find();
    res.status(200).json({ message: "All messages", data: messages });
  } catch (err) {
    next(err);
  }
};
