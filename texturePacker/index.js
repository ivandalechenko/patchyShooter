const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// const inputDir = './bearIdle';
// const inputDir = './bearShot';
// const inputDir = './bearHole1';
// const inputDir = './bearHole2';
// const inputDir = './bearIdle';
// const inputDir = './patchyBody';
// const inputDir = './patchyHead';
// const inputDir = './bearBlood';
// const inputDir = './patchyHandIdle';
// const inputDir = './patchyHandShot';
// const inputDir = './patchyBlink';
const inputDir = './patchyBlinkRight';


const outputDir = './cropped';
const webpQuality = 80;
const maxSpriteWidth = 4000;
const minAlpha = 50;
const scale = 0.4; // Масштаб: 1 = оригинал, 0.5 = уменьшение в 2 раза

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const files = fs.readdirSync(inputDir)
    .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
    .sort((a, b) => {
        const getNumber = name => parseInt(name.replace(/\D/g, '')) || 0;
        return getNumber(a) - getNumber(b);
    });

(async () => {
    const allRawImages = await Promise.all(
        files.map(async (file) => {
            const inputPath = path.join(inputDir, file);
            const img = sharp(inputPath).ensureAlpha();
            const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
            return { data, info };
        })
    );

    // Определяем crop-область по альфе
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    allRawImages.forEach(({ data, info }) => {
        const { width, height } = info;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                const alpha = data[idx + 3];
                if (alpha > minAlpha) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }
    });

    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;
    const scaledWidth = Math.round(cropWidth * scale);
    const scaledHeight = Math.round(cropHeight * scale);

    console.log(`📐 Найденная область: ${cropWidth}px x ${cropHeight}px`);
    console.log(`🔍 Масштабированные размеры: ${scaledWidth}px x ${scaledHeight}px`);

    const buffers = [];

    for (let i = 0; i < files.length; i++) {
        const inputPath = path.join(inputDir, files[i]);
        let img = sharp(inputPath)
            .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight });

        if (scale !== 1) {
            img = img.resize({
                width: scaledWidth,
                height: scaledHeight
            });
        }

        const buffer = await img.webp({ quality: webpQuality }).toBuffer();
        buffers.push(buffer);
    }

    const totalFrames = buffers.length;
    const framesPerRow = Math.min(totalFrames, Math.floor(maxSpriteWidth / scaledWidth));
    const rows = Math.ceil(totalFrames / framesPerRow);
    const spriteWidth = framesPerRow * scaledWidth;
    const spriteHeight = rows * scaledHeight;

    console.log(`🧱 Спрайт: ${framesPerRow} в ряд, ${rows} рядов, итог: ${spriteWidth}px x ${spriteHeight}px`);

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
        left: (i % framesPerRow) * scaledWidth,
        top: Math.floor(i / framesPerRow) * scaledHeight
    }));

    await sprite.composite(composites).webp({ quality: webpQuality }).toFile(path.join(outputDir, `${inputDir.slice(2)}.webp`));

    console.log(`✅ Спрайт сохранён! ${inputDir.slice(2)}.webp`);
})();
