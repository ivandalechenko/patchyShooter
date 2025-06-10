import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';

export default (({ spriteRef }) => {
    const [image, setImage] = useState(null);

    // const frameW = 500;
    // const frameH = 422;
    // const framesInRow = 8;
    // const framesCount = 61;

    const frameW = 247;
    const frameH = 147;
    const framesInRow = 16;
    const framesCount = 61;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/patchyHandIdle.webp';
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




    // const [x, setX] = useState(() => window.innerWidth - 100 - frameW);

    const getX = () => window.innerWidth - 325 - frameW;
    const getY = () => window.innerHeight - (window.innerHeight / 2 - frameH / 7) - frameH;

    const [x, setX] = useState(() => getX());
    const [y, setY] = useState(() => getY());

    useEffect(() => {
        const handleResize = () => {
            // setX(window.innerWidth - 100 - frameW);
            setX(getX())
            setY(getY())
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
