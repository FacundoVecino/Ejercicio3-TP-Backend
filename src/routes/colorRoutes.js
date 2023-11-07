import express from 'express';

import { deleteColor, getColors, postColors, putColor } from '../controllers/colorControllers.js';
import { delete_params_colorSchema, get_params_colorSchema, post_colorSchema, put_colorSchema, put_params_colorSchema } from '../helpers/validationSchemas/colorSchemas.js';

import validateParams from '../middlewares/validateParams.js';
import validateBody from '../middlewares/validateBody.js';

const router = express.Router();

router.get('/', getColors);
router.get(
  '/:id',
  (req, res, next) => validateParams(req, res, next, get_params_colorSchema),
  getColors,
);

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

router.put(
  '/:id',
  (req, res, next) => validateParams(req, res, next, put_params_colorSchema),
  (req, res, next) => validateBody(req, res, next, put_colorSchema),
  putColor,
);

router.delete(
  '/:id',
  (req, res, next) => validateParams(req, res, next, delete_params_colorSchema),
  deleteColor,
);

export default router;
