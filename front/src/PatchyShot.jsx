import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';

export default (({ spriteRef }) => {
    const [image, setImage] = useState(null);

    const frameW = 262;
    const frameH = 197;
    const framesInRow = 15;
    const framesCount = 31;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/patchyHandShot.webp';
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



    // const [y, setY] = useState(() => window.innerHeight / 2 - frameH / 2);
    const getX = () => window.innerWidth - 320 - frameW;
    const getY = () => window.innerHeight - 442 - frameH;
    
    const [x, setX] = useState(() => getX());
    const [y, setY] = useState(() => getY());

    useEffect(() => {
        const handleResize = () => {
            // setY(window.innerHeight / 2 - frameH / 2);
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
