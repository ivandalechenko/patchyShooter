import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sprite } from 'react-konva';
import { Image as KonvaImage } from 'react-konva';

export default (({ spriteRef, oldBlood, newBlood }) => {
    const [image, setImage] = useState(null);

    const frameW = 396;
    const frameH = 146;
    const framesInRow = 10;
    const framesCount = 40;

    useEffect(() => {
        const img = new window.Image();
        img.src = '/bearBlood2.webp';
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
    useEffect(() => {
        const img = new window.Image();
        img.src = '/bloodEl.webp';
        img.onload = () => setimgBloodOld(img);
    }, []);




    return (
        <>
            {oldBlood > 0 && imgBloodOld &&
                <KonvaImage
                    image={imgBloodOld}
                    x={x}
                    y={y}
                    opacity={1}
                />
            }
            {oldBlood > 1 && imgBloodOld &&
                <KonvaImage
                    image={imgBloodOld}
                    x={x - 100}
                    y={y + 300}
                    rotation={-25}
                    opacity={1}
                />
            }
            {/* {oldBlood > 2 && imgBloodOld && */}
            {oldBlood > 2 && imgBloodOld &&
                <KonvaImage
                    image={imgBloodOld}
                    x={x}
                    y={y - 500}
                    rotation={40}
                    opacity={1}
                />
            }
            {image && (
                <Sprite
                    ref={spriteRef}
                    image={image}
                    animation="run"
                    animations={animations}
                    // x={x + [0, -100, 0][newBlood - 1]}
                    // y={y + [0, 300, -500][newBlood - 1]}
                    // rotation={[0, -25, 40][newBlood - 1]}
                    x={x}
                    y={y}
                    // rotation={[0, -25, 40][newBlood - 1]}
                    opacity={0}
                />
            )}


        </>
    );
});
