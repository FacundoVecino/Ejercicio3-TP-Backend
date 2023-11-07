const validateParams = (req, res, next, schema) => {
  const { error } = schema.validate(req.params);

  if (error) {
    res.status(400).json({
      data: null,
      message: error.details[0].message,
    });
    return;
  }

  next();
};

export default validateParams;
