import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';

export default (({ spriteRef }) => {

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


    const [y, setY] = useState(() => window.innerHeight / 2 - 239);

    useEffect(() => {
        const handleResize = () => {
            setY(window.innerHeight / 2 - 239);
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
                    x={100}
                    y={y}
                    opacity={0}
                />
            )}
        </>
    );
});
