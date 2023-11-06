import ColorModel from '../models/colorSchema.js';

export const getColors = async (_, res) => {
  try {
    const data = await ColorModel.find({});
    const filterData = data
      .filter((color) => color._doc.isActive === true)
      .map((color) => ({
        ...color._doc,
        password: undefined,
      }));
    res.json({ data: filterData, message: 'Colores encontrados' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error',
    });
  }
};

export const postColors = async (req, res) => {
  const { body } = req;
  const newColor = new ColorModel({
    name: body.name,
    hexagecimal: body.hexagecimal,
    rgbOrRgba: body.rgbOrRgba,
    isActive: true,
  });

  try {
    await newColor.save();
    res.status(201).json({
      data: null,
      message: 'Color creado exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'El color ya ha sido creado anteriormente',
      });
    } else {
      res.status(500).json({
        data: null,
        message: 'Ocurrió un error guardando el color',
        error: e.message,
      });
    }
  }
};
