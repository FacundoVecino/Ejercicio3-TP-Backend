import express from 'express';
import { getColors, postColors } from '../controllers/colorControllers.js';
import { validateBody } from '../middlewares/validateBody.js';
import { post_colorSchema } from '../helpers/validationSchemas/colorSchemas.js';

const router = express.Router();

router.get('/', getColors);

router.post(
  '/',
  (req, res, next) => validateBody(
    req,
    res,
    next,
    post_colorSchema,
  ),
  postColors,
);
