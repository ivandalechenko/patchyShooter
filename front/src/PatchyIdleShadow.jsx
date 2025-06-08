import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import animStore from './animStore';

export default observer(() => {
    const imageRef = useRef(null)
    const [image, setImage] = useState(null);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const img = new window.Image();
        img.src = '/shadow.webp';
        img.onload = () => setImage(img);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        imageRef.current?.skewX(animStore.mouseX / 4);
    }, [animStore.mouseX]);


    return image && (
        <KonvaImage
            ref={imageRef}
            image={image}
            x={windowSize.width - 365}
            y={windowSize.height / 2 + 175}
            width={1700}
            height={1700 / 1.9}

        />
    );
});
