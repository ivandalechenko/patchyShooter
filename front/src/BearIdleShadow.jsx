import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import animStore from './animStore';

export default observer(() => {
    const [image, setImage] = useState(null);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const img = new window.Image();
        img.src = '/shadow.webp';
        img.onload = () => setImage(img);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return image && (
        <KonvaImage
            image={image}
            x={225}
            y={windowHeight / 2 + 195}
            width={1500}
            height={1500 / 1.9}
            skewX={animStore.mouseX / 5}
        />
    );
});
