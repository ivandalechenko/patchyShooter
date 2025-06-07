const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// === НАСТРОЙКИ ===
const inputDir = './images';
const outputDir = './cropped';
const outputWidth = 800;             // ширина каждой картинки
const webpQuality = 80;              // качество webp (0–100)
const cropPercent = {
    left: 0.5,
    top: 0.2,
    bottom: 0.2,
    right: 0.1
};
const outputMode = 1;                // 0 = только спрайт, 1 = только картинки, 2 = всё
const framesPerRow = 20;             // количество кадров в строке
// ==================

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const files = fs.readdirSync(inputDir)
    .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
    .sort((a, b) => {
        const getNumber = name => parseInt(name.replace(/\D/g, '')) || 0;
        return getNumber(a) - getNumber(b);
    });

(async () => {
    const buffers = [];
    let frameHeight = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const inputPath = path.join(inputDir, file);
        console.log(inputPath);

        const metadata = await sharp(inputPath).metadata();
        const left = Math.floor(metadata.width * cropPercent.left);
        const top = Math.floor(metadata.height * cropPercent.top);
        const cropWidth = Math.floor(metadata.width * (1 - cropPercent.left - cropPercent.right));
        const cropHeight = Math.floor(metadata.height * (1 - cropPercent.top - cropPercent.bottom));

        const image = sharp(inputPath)
            .extract({ left, top, width: cropWidth, height: cropHeight })
            .resize({ width: outputWidth })
            .webp({ quality: webpQuality });

        const buffer = await image.toBuffer();
        buffers.push(buffer);

        if (frameHeight === 0) {
            const resizedMeta = await sharp(buffer).metadata();
            frameHeight = resizedMeta.height;
            console.log(`👉 Высота одного кадра при ширине ${outputWidth}px: ${frameHeight}px`);
        }

        if (outputMode === 1 || outputMode === 2) {
            const outputPath = path.join(outputDir, `${i}.webp`);
            await sharp(buffer).toFile(outputPath);
            console.log(`✅ Saved frame: ${outputPath}`);
        }
    }

    if (outputMode === 0 || outputMode === 2) {
        const totalFrames = buffers.length;
        const rows = Math.ceil(totalFrames / framesPerRow);
        const spriteWidth = outputWidth * framesPerRow;
        const spriteHeight = frameHeight * rows;

        console.log(`🧱 Спрайтшит: ${framesPerRow} кадров в ряд, итоговая ширина: ${spriteWidth}px, высота: ${spriteHeight}px`);

        const sprite = sharp({
            create: {
                width: spriteWidth,
                height: spriteHeight,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        });

        const composites = buffers.map((buf, i) => ({
            input: buf,
            left: (i % framesPerRow) * outputWidth,
            top: Math.floor(i / framesPerRow) * frameHeight
        }));

        await sprite.composite(composites).webp({ quality: webpQuality }).toFile(path.join(outputDir, 'sprite.webp'));
        console.log(`🎉 Спрайт сохранён: ${path.join(outputDir, 'sprite.webp')}`);
    }
})();
