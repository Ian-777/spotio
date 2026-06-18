const fs = require("fs");
const path = require("path");

const {
  addPhoto,
  getStorePhotos,
  deletePhoto,
} = require("../models/photosModel");

const uploadPhoto = async (
  req,
  res
) => {
  try {
    const { user_id, store_id } =
      req.body;

    if (!req.file) {
      return res.status(400).json({
        message:
          "No se recibió ninguna imagen",
      });
    }

    const image_url = `/uploads/${req.file.filename}`;

    const photo =
      await addPhoto({
        user_id,
        store_id,
        image_url,
      });

    res.status(201).json(photo);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al subir imagen",
    });
  }
};

const getPhotos = async (
  req,
  res
) => {
  try {
    const { store_id } =
      req.params;

    const photos =
      await getStorePhotos(
        store_id
      );

    res.json(photos);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al obtener imágenes",
    });
  }
};

const removePhoto = async (
  req,
  res
) => {
  try {
    const {
      photo_id,
      user_id,
    } = req.params;

    const photo =
      await deletePhoto(
        photo_id,
        user_id
      );

    if (!photo) {
      return res.status(404).json({
        message:
          "Imagen no encontrada",
      });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      photo.image_url
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.json({
      message:
        "Imagen eliminada",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al eliminar imagen",
    });
  }
};

module.exports = {
  uploadPhoto,
  getPhotos,
  removePhoto,
};