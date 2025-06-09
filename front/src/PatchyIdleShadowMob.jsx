import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import animStore from './animStore';

export default observer(() => {
    const imageRef = useRef(null)
    const [image, setImage] = useState(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = '/shadow.webp';
        img.onload = () => setImage(img);
    }, []);


    useEffect(() => {
        imageRef.current?.skewX(animStore.mouseX / 4);
    }, [animStore.mouseX]);



    const [x, setX] = useState(() => window.innerWidth / 2 - 70);

    useEffect(() => {
        const handleResize = () => {
            setX(window.innerWidth / 2 - 70);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [y, setY] = useState(() => window.innerHeight / 2 + 200);

    useEffect(() => {
        const handleResize = () => {
            setY(window.innerHeight / 2 + 200);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return image && (
        <KonvaImage
            ref={imageRef}
            image={image}
            x={x}
            y={y}
            width={1700}
            height={1700 / 1.9}

        />
    );
});
