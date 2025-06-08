import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';
import animStore from './animStore';

export default observer(({ frame, show }) => {
    const spriteRef = useRef();
    const [image, setImage] = useState(null);

    const frameW = 500;
    const frameH = 422;
    const framesInRow = 8;
    const framesCount = 61;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/patchyHand.webp';
        img.onload = () => setImage(img);
    }, []);

    const animations = useMemo(() => {
        const run = [];
        for (let i = 0; i < framesCount; i++) {
            const x = (i % framesInRow) * frameW;
            const y = Math.floor(i / framesInRow) * frameH;
            run.push(x, y, frameW, frameH);
        }
        return { run };
    }, []);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.frameIndex(frame);
            spriteRef.current.getLayer().batchDraw();
        }
    }, [frame]);

    return (
        <>
            {image && (
                <Sprite
                    ref={spriteRef}
                    image={image}
                    animation="run"
                    animations={animations}
                    x={window.innerWidth - 100 - frameW}
                    y={window.innerHeight / 2 - frameH / 2}
                    opacity={show ? 1 : 0}
                />
            )}
        </>
    );
});
