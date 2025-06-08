import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Sprite, Image as KonvaImage } from 'react-konva';
import animStore from './animStore';
import BearIdleShadow from './BearIdleShadow';


import Konva from 'konva';

export default observer(({ frame, show }) => {
    const [image, setImage] = useState(null);
    const spriteRef = useRef();

    const framesInRow = 8;
    const frameW = 500;
    const frameH = 478;
    const framesCount = 61;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/bear.webp';
        img.onload = () => setImage(img);
    }, []);

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
                <>
                    {/* Основной персонаж */}
                    <BearIdleShadow />
                    <Sprite
                        ref={spriteRef}
                        image={image}
                        animation="run"
                        animations={animations}
                        frameRate={animStore.fps}
                        frameIndex={frame}
                        x={100}
                        y={window.innerHeight / 2 - 239}
                        opacity={show ? 1 : 0}
                    />

                </>
            )}
        </>
    );
});
