import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';
import { Image as KonvaImage } from 'react-konva';

export default (({ spriteRef, oldBlood }) => {
    const [image, setImage] = useState(null);

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

    const getX = () => window.innerWidth - (window.innerWidth - frameW / 2) - frameW;
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




    const [imgBloodOld, setimgBloodOld] = useState(null);
    const imageRef = useRef(null)
    useEffect(() => {
        const img = new window.Image();
        img.src = '/bloodEl.webp';
        img.onload = () => setimgBloodOld(img);
    }, []);




    return (
        <>
            {oldBlood && imgBloodOld &&
                <KonvaImage
                    image={imgBloodOld}
                    x={x}
                    y={y}
                    opacity={1}
                    ref={imageRef}
                />
            }
            {image && (
                <Sprite
                    ref={spriteRef}
                    image={image}
                    animation="run"
                    animations={animations}
                    // x={-150}
                    x={x}
                    y={y}
                    opacity={0}
                />
            )}


        </>
    );
});
