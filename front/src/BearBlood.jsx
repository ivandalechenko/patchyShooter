import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';

export default (({ spriteRef }) => {
    const [image, setImage] = useState(null);

    // const frameW = 500;
    // const frameH = 218;
    // const framesInRow = 8;
    // const framesCount = 21;

    const frameW = 396;
    const frameH = 146;
    const framesInRow = 10;
    const framesCount = 40;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/bearBlood.webp';
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

    // const [y, setY] = useState(() => window.innerHeight / 2 + 90);

    const getX = () => window.innerWidth - (window.innerWidth - frameW /2) - frameW;
    const getY = () => window.innerHeight - (window.innerHeight / 2 - frameH - frameH / 3) - frameH;

    const [x, setX] = useState(() => getX());
    const [y, setY] = useState(() => getY());

    useEffect(() => {
        const handleResize = () => {
            // setY(window.innerHeight / 2 + 90);
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
                    // x={-150}
                    x={x}
                    opacity={0}
                    y={y}
                />
            )}
        </>
    );
});
