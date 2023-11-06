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

export const putColor = async (req, res) => {
  const { body, params: { id } } = req;
  try {
    const action = await ColorModel.updateOne({ _id: id }, body);
    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontró color con ese id',
      });
      return;
    }
    res.json({
      data: null,
      message: 'El color ha sido actualizado correctamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error actualizando la tarea',
      error: e.message,
    });
  }
};

export const deleteColor = async (req, res) => {
  const { params: { id } } = req;
  try {
    const action = await ColorModel.updateOne({ _id: id, isActive: true }, { isActive: false });
    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontró el color con ese id',
      });
      return;
    }
    res.json({
      data: null,
      message: 'El color se ha eliminado exitosamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error eliminando el color',
      error: e.message,
    });
  }
};
