import multer from "multer";
import path from "path";

// verificamos el tipo de archivo
const fileFilter = (req: any, file: any, cb: any) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|avi|mov/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    return cb(new Error("unsuportted file"), false);
  }
};

// configuracion del almacenamiento de multer
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    // comprobamos tipo de imagen
    if (file.mimetype.startsWith("image/")) {
      cb(null, "assets/images/"); // Carpeta para imágenes
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, "assets/videos/"); // Carpeta para videos
    } else {
      cb(new Error("Tipo de archivo no válido"), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Nombre único
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Nombre del archivo
  },
});

// inicializamos el multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// helper
const uploadFile = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error al subir el archivo", error: err.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se ha recibido ningún archivo" });
    }
    // Retorna el nombre del archivo
    res
      .status(200)
      .json({
        message: "Archivo subido con éxito",
        filename: req.file.filename,
      });
  });
};

export default uploadFile;