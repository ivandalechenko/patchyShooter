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



    const [x, setX] = useState(() => window.innerWidth - 365);

    useEffect(() => {
        const handleResize = () => {
            setX(window.innerWidth - 365);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [y, setY] = useState(() => window.innerHeight / 2 + 175);

    useEffect(() => {
        const handleResize = () => {
            setY(window.innerHeight / 2 + 175);
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
            width={1900}
            height={1900 / 1.9}

        />
    );
});
