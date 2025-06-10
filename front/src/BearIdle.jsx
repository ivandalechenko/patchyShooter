import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';
import BearIdleShadow from './BearIdleShadow';

export default (({ spriteRef }) => {
    const [image, setImage] = useState(null);

    const frameW = 337;
    const frameH = 481;
    const framesInRow = 11;
    const framesCount = 61;

    useEffect(() => {
        const img = new Image();
        img.src = '/bearIdle2.webp';
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


    // const getY = () => window.innerHeight / 2 - 239
    const getY = () => window.innerHeight / 2 - 265


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
                <>
                    <BearIdleShadow />
                    <Sprite
                        ref={spriteRef}
                        image={image}
                        animation="run"
                        animations={animations}
                        x={157}
                        y={y}
                    />
                </>
            )}
        </>
    );
});
