import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';

export default (({ spriteRef }) => {
    const [image, setImage] = useState(null);

    const frameW = 40;
    const frameH = 70;
    const framesInRow = 9;
    const framesCount = 9;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/patchyBlinkLeft.webp';
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

    const getX = () => window.innerWidth - (window.innerWidth - window.innerWidth + frameW * 9 + 1) - frameW;
    const getY = () => window.innerHeight - (window.innerHeight - window.innerHeight / 2 + frameH * 1.7) - frameH;

    const [x, setX] = useState(() => getX());
    const [y, setY] = useState(() => getY());


    useEffect(() => {
        const handleResize = () => {
            setX(getX());
            setY(getY());
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
