import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';
import animStore from './animStore';

export default observer(({ frame, show }) => {
    const spriteRef = useRef();
    const [image, setImage] = useState(null);

    const frameW = 500;
    const frameH = 478;
    const framesInRow = 8;
    const framesCount = 61;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/bearHole2.webp';
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


    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.opacity(show ? 1 : 0);
            spriteRef.current.getLayer().batchDraw();
        }
    }, [show]);

    return (
        <>
            {image && (
                <Sprite
                    ref={spriteRef}
                    image={image}
                    animation="run"
                    animations={animations}
                    x={100}
                    y={window.innerHeight / 2 - 239}
                    opacity={0}
                />
            )}
        </>
    );
});
