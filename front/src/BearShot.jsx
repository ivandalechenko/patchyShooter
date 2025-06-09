import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sprite } from 'react-konva';

export default observer(({ spriteRef }) => {

    const [image, setImage] = useState(null);

    const frameW = 500;
    const frameH = 478;
    const framesInRow = 8;
    const framesCount = 21;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/bearShot.webp';
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
                    opacity={0}
                    y={y}
                />
            )}
        </>
    );
});
