import ColorModel from '../models/colorSchema.js';

export const getColors = async (_, res) => {
  try {
    const data = await ColorModel.find({});
    const filterData = data.filter((color) => color._doc.isActive === true);
    res.json({ data: filterData, message: 'Colores encontrados' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error',
    });
  }
};

export const getColor = async (req, res) => {
  const { params: { id } } = req;
  try {
    const dataColor = await ColorModel.findOne({ _id: id, isActive: true });
    if (!dataColor) {
      res.status(400).json({
        data: null,
        message: 'No se encontró el color con ese id',
      });
      return;
    }
    res.json({
      data: dataColor,
      message: 'Color encontrado',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error buscando el color',
      error: e.message,
    });
  }
};

export const postColors = async (req, res) => {
  const { body } = req;

  if (body.hexagecimal === null) {
    res.status(400).json({
      data: null,
      message: 'El campo hexagecimal no puede ser null',
    });
    return;
  }

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
      try {
        const existingColor = await ColorModel.findOne({ hexagecimal: body.hexagecimal });

        if (existingColor) {
          if (!existingColor.isActive) {
            existingColor.isActive = true;
            await existingColor.save();

            res.status(200).json({
              data: null,
              message: 'El color había sido eliminado lógicamente, pero ahora se ha vuelto a agregar.',
            });
            return;
          }
        }
      } catch (err) {
        res.status(500).json({
          data: null,
          message: 'Ocurrió un error al verificar el color existente',
          error: err.message,
        });
        return;
      }

      res.status(400).json({
        data: null,
        message: 'El color ya ha sido creado anteriormente y está activo',
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
  const {
    body,
    params: { id },
  } = req;
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
  const {
    params: { id },
  } = req;
  try {
    const action = await ColorModel.updateOne(
      { _id: id, isActive: true },
      { isActive: false },
    );
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
