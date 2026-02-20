/**
 * Enhanced logo processor: clarity, background removal, PNG output
 * Processes IMG_567.jpg -> dictole-logo.png
 */
const sharp = require("sharp");
const fs = require("fs");

async function processLogo() {
  const inputImage = "IMG_567.jpg";
  const outputLogo = "dictole-logo.png";

  if (!fs.existsSync(inputImage)) {
    console.error("Error: IMG_567.jpg not found");
    process.exit(1);
  }

  console.log("Processing IMG_567.jpg -> dictole-logo.png");
  console.log("  Enhancing clarity, removing background...\n");

  try {
    const { data, info } = await sharp(inputImage)
      .normalize()
      .sharpen({ sigma: 1.2 })
      .modulate({ brightness: 1.05, saturation: 1.1 })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;

    // Get corner colors for background
    const getPixel = (x, y) => {
      const i = (y * width + x) * channels;
      return { r: data[i], g: data[i + 1], b: data[i + 2] };
    };
    const corners = [
      getPixel(0, 0),
      getPixel(width - 1, 0),
      getPixel(0, height - 1),
      getPixel(width - 1, height - 1)
    ];
    const bg = {
      r: Math.round(corners.reduce((s, c) => s + c.r, 0) / 4),
      g: Math.round(corners.reduce((s, c) => s + c.g, 0) / 4),
      b: Math.round(corners.reduce((s, c) => s + c.b, 0) / 4)
    };

    const threshold = 50;
    const rgba = Buffer.alloc(width * height * 4);

    for (let i = 0; i < width * height; i++) {
      const si = i * channels;
      const di = i * 4;
      const r = data[si], g = data[si + 1], b = data[si + 2];
      const diff = Math.abs(r - bg.r) + Math.abs(g - bg.g) + Math.abs(b - bg.b);
      const a = diff < threshold ? 0 : 255;
      rgba[di] = r;
      rgba[di + 1] = g;
      rgba[di + 2] = b;
      rgba[di + 3] = a;
    }

    await sharp(rgba, { raw: { width, height, channels: 4 } })
      .png()
      .resize(120, 120, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(outputLogo);

    console.log("Done! Created", outputLogo);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

processLogo();
