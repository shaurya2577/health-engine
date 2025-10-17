const { body, validationResult, param } = require('express-validator');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Resource validation rules
const validateResource = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters')
    .escape(),
  body('tag')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Tag must be between 1 and 50 characters')
    .escape(),
  body('link')
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('Link must be a valid URL')
    .normalizeUrl(),
  handleValidationErrors
];

// Login validation rules
const validateLogin = [
  body('password')
    .trim()
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  handleValidationErrors
];

// Resource ID validation
const validateResourceId = [
  param('resourceID')
    .isInt({ min: 1 })
    .withMessage('Resource ID must be a positive integer'),
  handleValidationErrors
];

module.exports = {
  validateResource,
  validateLogin,
  validateResourceId,
  handleValidationErrors
};

