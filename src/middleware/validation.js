


export const validation = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResult.error.details.map((err) => err.message),
      });
    }
    next();
  };
};