import Joi from 'joi';

export const post_colorSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20)
    .required()
    .messages({
      'string.min': 'El campo name debe tener al menos 3 caracteres',
      'string.max': 'El campo name debe tener, como mucho, 20 caracteres',
      'any.required': 'El campo name es requerido',
      '*': 'Revisa el campo name',
    }),
  hexagecimal: Joi.string().regex(/^#[0-9A-Fa-f]{6}$/)
    .required()
    .messages({
      'string.pattern.base': 'El campo hexagecimal debe ser un valor hexadecimal de 6 caracteres (formato: #123abc)',
      'any.required': 'El campo hexagecimal es requerido',
      '*': 'Revisa el campo hexagecimal',
    }),

  rgbOrRgba: Joi.string().regex(/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(,\s*\d*\.?\d+\s*)?\)$/)
    .required()
    .messages({
      'string.pattern.base': 'El campo rgbOrRgba debe ser un valor valido en formato rgb(*, *, *) o rgba(*, *, *, *)',
      'any.required': 'El campo rgbOrRgba es requerido',
      '*': 'Revisa el campo rgbOrRgba',
    }),
});
