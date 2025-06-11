import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';

export default (({ spriteRef }) => {

    const [image, setImage] = useState(null);

    const frameW = 120;
    const frameH = 198;
    const framesInRow = 21;
    const framesCount = 21;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/1bearHole1.webp';
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


    const getY = () => window.innerHeight / 2 - 60

    const [y, setY] = useState(() => getY());

    useEffect(() => {
        const handleResize = () => {
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
                    x={230}
                    y={y}
                    opacity={0}
                />
            )}
        </>
    );
});
