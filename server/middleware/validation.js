import { body, validationResult, param } from 'express-validator';

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
    .withMessage('Link must be a valid URL'),
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

// Job application validation
const validateJobApplication = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters')
    .escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number must be less than 20 characters')
    .escape(),
  body('resumeUrl')
    .optional()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) return true;
      return /^https?:\/\/.+/.test(value);
    })
    .withMessage('Resume URL must be a valid URL'),
  body('coverLetter')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Cover letter must be less than 2000 characters')
    .escape(),
  body('linkedin')
    .optional()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) return true;
      return /^https?:\/\/.+/.test(value);
    })
    .withMessage('LinkedIn URL must be a valid URL'),
  body('portfolio')
    .optional()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) return true;
      return /^https?:\/\/.+/.test(value);
    })
    .withMessage('Portfolio URL must be a valid URL'),
  handleValidationErrors
];

// Universal application validation
const validateUniversalApplication = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters')
    .escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number must be less than 20 characters')
    .escape(),
  body('university')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('University name must be less than 100 characters')
    .escape(),
  body('graduationYear')
    .optional()
    .trim()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) return true;
      const year = parseInt(value, 10);
      if (isNaN(year) || year < 1900 || year > 2030) {
        throw new Error('Graduation year must be between 1900 and 2030');
      }
      return true;
    }),
  body('major')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Major must be less than 100 characters')
    .escape(),
  body('resumeUrl')
    .optional()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) return true;
      return /^https?:\/\/.+/.test(value);
    })
    .withMessage('Resume URL must be a valid URL'),
  body('linkedin')
    .optional()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) return true;
      return /^https?:\/\/.+/.test(value);
    })
    .withMessage('LinkedIn URL must be a valid URL'),
  body('portfolio')
    .optional()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) return true;
      return /^https?:\/\/.+/.test(value);
    })
    .withMessage('Portfolio URL must be a valid URL'),
  body('interests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Interests must be less than 500 characters')
    .escape(),
  body('experience')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Experience must be less than 1000 characters')
    .escape(),
  body('skills')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Skills must be less than 500 characters')
    .escape(),
  handleValidationErrors
];

// Job posting validation
const validateJobPosting = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .escape(),
  body('company')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company must be between 1 and 100 characters')
    .escape(),
  body('location')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Location must be between 1 and 100 characters')
    .escape(),
  body('category')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Category must be between 1 and 50 characters')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Description must be between 1 and 2000 characters')
    .escape(),
  body('requirements')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Requirements must be less than 1000 characters')
    .escape(),
  body('salary')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Salary must be less than 100 characters')
    .escape(),
  body('type')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Type must be between 1 and 50 characters')
    .escape(),
  handleValidationErrors
];

export {
  validateResource,
  validateLogin,
  validateResourceId,
  validateJobApplication,
  validateUniversalApplication,
  validateJobPosting,
  handleValidationErrors
};



