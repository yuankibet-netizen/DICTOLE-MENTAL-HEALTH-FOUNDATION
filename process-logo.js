const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function processImage() {
  const inputImage = "IMG_567.jpg";
  const outputNoBg = "logo-no-bg.png";
  const finalLogo = "logo.png";
  
  console.log("Starting image processing...");
  console.log("Using sharp for image processing...\n");
  
  try {
    // First, get image info
    console.log("Step 1: Analyzing image...");
    const image = sharp(inputImage);
    const metadata = await image.metadata();
    
    console.log("Original dimensions:", metadata.width, "x", metadata.height);
    console.log("Format:", metadata.format);
    console.log("Channels:", metadata.channels);
    
    // Read the image as raw pixels to analyze background color
    console.log("\nStep 2: Analyzing background color...");
    const { data, info } = await sharp(inputImage)
      .resize(100, 100, { fit: "cover" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    // Get corner colors to estimate background
    const corners = [
      { x: 0, y: 0 }, // top-left
      { x: info.width - 1, y: 0 }, // top-right
      { x: 0, y: info.height - 1 }, // bottom-left
      { x: info.width - 1, y: info.height - 1 } // bottom-right
    ];
    
    const cornerColors = corners.map(corner => {
      const idx = (corner.y * info.width + corner.x) * info.channels;
      return {
        r: data[idx],
        g: data[idx + 1],
        b: data[idx + 2]
      };
    });
    
    console.log("Corner colors:", cornerColors);
    
    // Use the most common corner color as background
    const bgColor = cornerColors[0];
    console.log("Using background color:", bgColor);
    
    // Step 3: Remove background using color key
    console.log("\nStep 3: Removing background...");
    
    // Create a mask for the background color
    const threshold = 30; // Tolerance for color matching
    
    const processedBuffer = await sharp(inputImage)
      .raw()
      .toBuffer();
    
    const pixels = processedBuffer;
    const width = metadata.width;
    const height = metadata.height;
    const channels = metadata.channels;
    
    // Create RGBA buffer (4 channels)
    const rgbaBuffer = Buffer.alloc(width * height * 4);
    
    for (let i = 0; i < width * height; i++) {
      const srcIdx = i * channels;
      const dstIdx = i * 4;
      
      const r = pixels[srcIdx];
      const g = pixels[srcIdx + 1];
      const b = pixels[srcIdx + 2];
      const alpha = pixels[srcIdx + 3] || 255;
      
      // Check if this pixel matches background color
      const colorDiff = Math.abs(r - bgColor.r) + Math.abs(g - bgColor.g) + Math.abs(b - bgColor.b);
      
      if (colorDiff < threshold) {
        // Make transparent
        rgbaBuffer[dstIdx] = r;
        rgbaBuffer[dstIdx + 1] = g;
        rgbaBuffer[dstIdx + 2] = b;
        rgbaBuffer[dstIdx + 3] = 0; // Fully transparent
      } else {
        rgbaBuffer[dstIdx] = r;
        rgbaBuffer[dstIdx + 1] = g;
        rgbaBuffer[dstIdx + 2] = b;
        rgbaBuffer[dstIdx + 3] = alpha; // Keep original alpha
      }
    }
    
    // Save the processed image
    await sharp(rgbaBuffer, {
      raw: {
        width: width,
        height: height,
        channels: 4
      }
    })
      .png()
      .toFile(outputNoBg);
    
    console.log("Background removed! Saved as", outputNoBg);
    
    // Step 4: Create cool logo with effects
    console.log("\nStep 4: Creating cool logo...");
    
    // Resize to a standard logo size
    const logoSize = 512;
    
    await sharp(outputNoBg)
      .resize(logoSize, logoSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(finalLogo);
    
    console.log("Logo created! Saved as", finalLogo);
    
    // Also create different sizes
    const sizes = [32, 64, 128, 256];
    for (const size of sizes) {
      const filename = `logo-${size}.png`;
      await sharp(outputNoBg)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(filename);
      console.log("Created", filename);
    }
    
    // Create a circular version for avatars/profile using proper alpha channel
    const circularLogo = "logo-circular.png";
    const circleSize = 256;
    
    // Create a circular mask
    const circleBuffer = Buffer.alloc(circleSize * circleSize * 4);
    const centerX = circleSize / 2;
    const centerY = circleSize / 2;
    const radius = circleSize / 2;
    
    for (let y = 0; y < circleSize; y++) {
      for (let x = 0; x < circleSize; x++) {
        const idx = (y * circleSize + x) * 4;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        
        if (distance <= radius) {
          circleBuffer[idx] = 255;     // R
          circleBuffer[idx + 1] = 255; // G
          circleBuffer[idx + 2] = 255; // B
          circleBuffer[idx + 3] = 255; // A (fully opaque inside circle)
        } else {
          circleBuffer[idx] = 0;       // R
          circleBuffer[idx + 1] = 0;   // G
          circleBuffer[idx + 2] = 0;   // B
          circleBuffer[idx + 3] = 0;   // A (fully transparent outside circle)
        }
      }
    }
    
    await sharp(outputNoBg)
      .resize(circleSize, circleSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .composite([{
        input: circleBuffer,
        raw: { width: circleSize, height: circleSize, channels: 4 },
        blend: "dest-in"
      }])
      .png()
      .toFile(circularLogo);
    console.log("Created", circularLogo);
    
    // Create a "cool" version with gradient background
    const coolLogo = "logo-cool.png";
    const gradientSize = 512;
    const logoResize = 358; // 512 * 0.7 rounded down
    
    // Create a cool gradient background
    const gradientBuffer = Buffer.alloc(gradientSize * gradientSize * 4);
    for (let y = 0; y < gradientSize; y++) {
      for (let x = 0; x < gradientSize; x++) {
        const idx = (y * gradientSize + x) * 4;
        // Create a nice purple to blue gradient
        gradientBuffer[idx] = Math.floor(100 + (x / gradientSize) * 100);     // R
        gradientBuffer[idx + 1] = Math.floor(50 + (y / gradientSize) * 50);  // G
        gradientBuffer[idx + 2] = Math.floor(180 + (x / gradientSize) * 75); // B
        gradientBuffer[idx + 3] = 255; // A
      }
    }
    
    // Resize the logo and composite with gradient
    await sharp(outputNoBg)
      .resize(logoResize, logoResize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .composite([{
        input: gradientBuffer,
        raw: { width: gradientSize, height: gradientSize, channels: 4 },
        top: Math.floor(gradientSize * 0.15),
        left: Math.floor(gradientSize * 0.15)
      }])
      .png()
      .toFile(coolLogo);
    console.log("Created", coolLogo);
    
    console.log("\n✅ All done! Logo files created:");
    console.log("  - logo.png (main logo 512x512)");
    console.log("  - logo-no-bg.png (transparent background)");
    console.log("  - logo-circular.png (circular version)");
    console.log("  - logo-32.png, logo-64.png, logo-128.png, logo-256.png (sizes)");
    
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

processImage();
