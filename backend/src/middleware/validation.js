import Joi from 'joi';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      error.isJoi = true;
      return next(error);
    }
    
    next();
  };
};

export const schemas = {
  login: Joi.object({
    username: Joi.string().required(),
    clinicDomain: Joi.string().required(),
    password: Joi.string().required(),
  }),
  
  createPatient: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().integer().min(18).max(60),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
    email: Joi.string().email().allow(''),
    amh: Joi.number().min(0).max(20),
    bmi: Joi.number().min(10).max(50),
  }),
  
  createTimelineEvent: Joi.object({
    cycleId: Joi.string().uuid(),
    eventType: Joi.string().required(),
    cycleDay: Joi.number().integer().min(1),
    clinicalData: Joi.object(),
    communicationData: Joi.object(),
    reactionData: Joi.object(),
    counselingData: Joi.object(),
    summaryText: Joi.string().allow(''),
  }),
};
