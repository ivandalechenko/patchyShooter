import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';
import animStore from './animStore';

export default observer(({ spriteRef }) => {
    const [image, setImage] = useState(null);

    const frameW = 500;
    const frameH = 422;
    const framesInRow = 8;
    const framesCount = 61;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/patchyBlink.webp';
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


    const [x, setX] = useState(() => window.innerWidth - 100 - frameW);
    useEffect(() => {
        const handleResize = () => {
            setX(window.innerWidth - 100 - frameW);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const [y, setY] = useState(() => window.innerHeight / 2 - frameH / 2);
    useEffect(() => {
        const handleResize = () => {
            setY(window.innerHeight / 2 - frameH / 2);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            {image && (
                <Sprite
                    ref={spriteRef}
                    image={image}
                    animation="run"
                    animations={animations}
                    x={x}
                    y={y}
                />
            )}
        </>
    );
});
