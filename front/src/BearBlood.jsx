import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Sprite } from 'react-konva';
import animStore from './animStore';

export default observer(({ frame, show }) => {

    const spriteRef = useRef();
    const [image, setImage] = useState(null);

    // Загрузка спрайтшита
    useEffect(() => {
        const img = new window.Image();
        // img.src = '/bearShot.webp'; // Замените на путь к вашему спрайтшиту
        img.src = '/bearBlood.webp'; // Замените на путь к вашему спрайтшиту

        img.onload = () => setImage(img);
    }, []);

    const framesInRow = 8;
    const frameW = 500;
    const frameH = 218;
    const framesCount = 21;

    const animations = {
        run: [],
    };

    for (let i = 0; i < framesCount; i++) {
        const x = (i % framesInRow) * frameW;
        const y = Math.floor(i / framesInRow) * frameH;
        animations.run.push(x, y, frameW, frameH);
    }

    return (
        <>
            {image && (
                <Sprite
                    opacity={show ? 1 : 0}
                    ref={spriteRef}
                    image={image}
                    animation="run"
                    animations={animations}
                    frameRate={animStore.fps} // Скорость анимации (кадры в секунду)
                    frameIndex={frame}
                    x={-80} // Центрирование по X
                    y={window.innerHeight / 2 + 90} // Центрирование по Y
                />
            )}
        </>
    )
})