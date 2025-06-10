import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';
import PatchyIdleShadow from './PatchyIdleShadow';

export default (({ spriteRef }) => {
    const [image, setImage] = useState(null);

    const frameW = 222;
    const frameH = 243;
    const framesInRow = 18;
    const framesCount = 61;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/patchyBody.webp';
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


    const getX = () => window.innerWidth - 195 - frameW
    const getY = () => window.innerHeight / 2 - frameH / 2 + 75


    const [y, setY] = useState(() => getY());
    const [x, setX] = useState(() => getX());

    useEffect(() => {
        const handleResize = () => {
            setY(getY());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setX(getX());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {image && (
                <>
                    <PatchyIdleShadow />
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
