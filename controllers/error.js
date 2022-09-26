exports.get404 = (req, res, next) => {
  res.status(404).json({
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
};

exports.errorResponse = (res, message, statusCode = 500, error = {}) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: {
      statusCode,
      message,
      error,
    },
  });
};

exports.successResponse = (res, statusCode = 200, data) => {
  res.status(statusCode).json({
    success: true,
    message: 'Successfuly created',
    data,
    status: { statusCode },
  });
};
