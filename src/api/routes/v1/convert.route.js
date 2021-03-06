const express = require('express');
const controller = require('../../controllers/convert.controller');
const {
  receiveAlphanum,
  receiveBits,
  receiveMorse,
  receiveMorseWithOptQuery,
} = require('../../validations/convert.validation');
const APIError = require('../../utils/APIError');
const logger = require('../../../config/logger');

const router = express.Router();

router.post('/bits/morse', receiveBits, (req, res, next) => {
  const { text } = req.body;

  if (!text.includes('1')) throw new APIError({ message: 'At least one pulse required', status: 400 });

  try {
    const converted = controller.bits2morse(text);

    return res.json({ text: converted });
  } catch (error) {
    logger.error('Error in endpoint /api/v1/convert/bits/morse.', { requestId: req.id, error });
    return next(error);
  }
});

router.post('/morse/human', receiveMorse, (req, res, next) => {
  const { text } = req.body;
  const { method } = req.query;

  try {
    const converted = controller.morse2human(text, method);

    return res.json({ text: converted });
  } catch (error) {
    logger.error('Error in endpoint /api/v1/convert/morse/human.', { requestId: req.id, error });
    return next(error);
  }
});

router.post('/morse/bits', receiveMorseWithOptQuery, (req, res, next) => {
  const { text } = req.body;
  const { bitLength } = req.query;

  try {
    const converted = controller.morse2bits(text, bitLength);

    return res.json({ text: converted });
  } catch (error) {
    logger.error('Error in endpoint /api/v1/convert/morse/bits.', { requestId: req.id, error });
    return next(error);
  }
});

router.post('/human/morse', receiveAlphanum, (req, res, next) => {
  const { text } = req.body;

  try {
    const converted = controller.human2morse(text);

    return res.json({ text: converted });
  } catch (error) {
    logger.error('Error in endpoint /api/v1/convert/human/morse.', { requestId: req.id, error });
    return next(error);
  }
});

module.exports = router;
