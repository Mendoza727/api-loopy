import { createCanvas } from "canvas";
import path from "path";
import fs from "fs";

const generateAvatar = (username: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Definir tamaño y color de fondo
    const canvasSize = 100;
    const canvas = createCanvas(canvasSize, canvasSize);
    const ctx = canvas.getContext("2d");

    // Establecer color de fondo aleatorio
    const colors = ["#3498db", "#2ecc71", "#e74c3c", "#9b59b6", "#f1c40f"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillStyle = randomColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Configurar el texto del avatar con el nombre de usuario
    const fontSize = 30;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "#fff"; // Color de texto blanco
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Tomar las primeras dos letras del nombre de usuario
    const initials = username.slice(0, 2).toUpperCase();
    ctx.fillText(initials, canvasSize / 2, canvasSize / 2);

    // Guardar la imagen en el directorio 'src/avatars'
    const avatarPath = path.join(__dirname, "..", "assets", "avatars", `${username}_avatar.png`);
    const fileName = path.basename(avatarPath);

    const file = `avatars/${fileName}`;

    // Crear el directorio si no existe
    const avatarDir = path.dirname(avatarPath);
    if (!fs.existsSync(avatarDir)) {
      fs.mkdirSync(avatarDir, { recursive: true });
    }

    // Guardar la imagen
    const buffer = canvas.toBuffer("image/png");
    fs.writeFile(avatarPath, buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(file); // Devuelve la ruta de la imagen generada
      }
    });
  });
};

export default generateAvatar;
