import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';

export default (({ spriteRef, framesCount }) => {
    const [image, setImage] = useState(null);

    const frameW = 198;
    const frameH = 302;
    const framesInRow = 20;

    useEffect(() => {
        const img = new Image();
        img.src = '/handPC.webp';
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

    const getX = () => window.innerWidth / 2 - frameW / 2 + 290
    const getY = () => window.innerHeight - frameH - 250

    const [y, setY] = useState(() => getY());
    const [x, setX] = useState(() => getX());

    useEffect(() => {
        const handleResize = () => {
            setY(getY());
            setX(getX());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            {image && (
                <>
                    <Sprite
                        ref={spriteRef}
                        image={image}
                        animation="run"
                        animations={animations}
                        x={x}
                        y={y}
                    />
                </>
            )}
        </>
    );
});
