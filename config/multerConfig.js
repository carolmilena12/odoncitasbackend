const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ruta ABSOLUTA CORRECTA - usa process.cwd() para obtener la ruta del proyecto
const uploadsDir = path.join(process.cwd(), 'uploads');
console.log("📍 Ruta ABSOLUTA de uploads:", uploadsDir);

// Crear carpeta si no existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Carpeta uploads creada:", uploadsDir);
}

// Verificar que la carpeta existe y tiene permisos
try {
  if (!fs.existsSync(uploadsDir)) {
    throw new Error('La carpeta uploads no existe');
  }
  fs.accessSync(uploadsDir, fs.constants.W_OK);
  console.log("✅ Permisos de escritura OK en uploads");
} catch (err) {
  console.error("❌ Error con la carpeta uploads:", err.message);
  // Crear la carpeta si hay error
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Carpeta uploads recreada");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📂 Guardando en:", uploadsDir); // Debug
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = "medico_" + uniqueSuffix + path.extname(file.originalname);
    console.log("📄 Nombre de archivo:", filename); // Debug
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'), false);
    }
  }
});

module.exports = { upload };