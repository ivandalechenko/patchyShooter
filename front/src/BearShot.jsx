import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sprite } from 'react-konva';

export default observer(({ frame, show }) => {
    const spriteRef = useRef();
    const [image, setImage] = useState(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = '/bearShot.webp';
        img.onload = () => setImage(img);
    }, []);

    const animations = useMemo(() => {
        const run = [];
        for (let i = 0; i < 21; i++) {
            const x = (i % 8) * 500;
            const y = Math.floor(i / 8) * 478;
            run.push(x, y, 500, 478);
        }
        return { run };
    }, []);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.frameIndex(frame);
        }
    }, [frame]);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.opacity(show ? 1 : 0);
            spriteRef.current.getLayer().batchDraw();
        }
    }, [show]);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.opacity(0);
        }
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
                    y={window.innerHeight / 2 - 239}
                />
            )}
        </>
    );
});
