import Joi from 'joi';

export const post_colorSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20)
    .required()
    .messages({
      'string.empty': 'El campo "name" no puede estar vacio',
      'string.min': 'El campo name debe tener al menos 3 caracteres',
      'string.max': 'El campo name debe tener, como mucho, 20 caracteres',
      'any.required': 'El campo name es requerido',
      '*': 'Revisa el campo name',
    }),
  hexagecimal: Joi.string().trim().min(3).max(9)
    .uppercase()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .required()
    .messages({
      'string.empty': 'El campo "hex" no puede estar vacio',
      'string.min': 'El campo "hex" debe tener al menos 3 caracteres',
      'string.max': 'El campo "hex" debe tener maximo 9 caracteres',
      'string.pattern.base': 'El campo hexagecimal debe ser un valor hexadecimal de 6 caracteres (formato: #123abc)',
      'any.required': 'El campo hexagecimal es requerido',
      '*': 'Revisa el campo hexagecimal',
    }),

  rgbOrRgba: Joi.string().regex(/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(,\s*\d*\.?\d+\s*)?\)$/)
    .required()
    .messages({
      'string.empty': 'El campo "rgb" no puede estar vacio',
      'string.pattern.base': 'El campo rgbOrRgba debe ser un valor valido en formato rgb(*, *, *) o rgba(*, *, *, *)',
      'any.required': 'El campo rgbOrRgba es requerido',
      '*': 'Revisa el campo rgbOrRgba',
    }),
});

export const put_colorSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20)
    .messages({
      'string.empty': 'El campo "name" no puede estar vacio',
      'string.min': 'El campo name debe tener al menos 3 caracteres',
      'string.max': 'El campo name debe tener, como mucho, 20 caracteres',
      '*': 'Revisa el campo name',
    }),
  hexagecimal: Joi.string().trim().min(3).max(9)
    .uppercase()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .messages({
      'string.empty': 'El campo "hex" no puede estar vacio',
      'string.min': 'El campo "hex" debe tener al menos 3 caracteres',
      'string.max': 'El campo "hex" debe tener maximo 9 caracteres',
      'string.pattern.base': 'El campo hexagecimal debe ser un valor hexadecimal de 6 caracteres (formato: #123abc)',
      '*': 'Revisa el campo hexagecimal',
    }),

  rgbOrRgba: Joi.string().regex(/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(,\s*\d*\.?\d+\s*)?\)$/)
    .messages({
      'string.empty': 'El campo "rgb" no puede estar vacio',
      'string.pattern.base': 'El campo rgbOrRgba debe ser un valor valido en formato rgb(*, *, *) o rgba(*, *, *, *)',
      '*': 'Revisa el campo rgbOrRgba',
    }),
}).custom((value, helper) => {
  const { name, hexagecimal, rgbOrRgba } = value;

  if (!name && !hexagecimal && !rgbOrRgba) {
    return helper.message('Al menos un campo debe estar presente en el body');
  }

  return true;
});

export const get_params_colorSchema = Joi.object({
  id: Joi.string().required().trim().length(24)
    .messages({
      'string.empty': 'El parámetro "id" no puede estar vacio',
      'string.length': 'El parámetro "id" debe ser un id válido',
      'any.required': 'El parámetro "id" es obligatorio',
      '*': 'Revisa el parámetro "id"',
    }),
});

// Son iguales al anterior
export const put_params_colorSchema = get_params_colorSchema;
export const delete_params_colorSchema = get_params_colorSchema;
