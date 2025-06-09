import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import animStore from './animStore';

export default observer(() => {
    const [image, setImage] = useState(null);

    const imageRef = useRef(null)

    useEffect(() => {
        const img = new window.Image();
        img.src = '/shadow.webp';
        img.onload = () => setImage(img);
    }, []);


    useEffect(() => {
        imageRef.current?.skewX(animStore.mouseX / 4);
    }, [animStore.mouseX]);



    const [y, setY] = useState(() => window.innerHeight / 2 + 195);

    useEffect(() => {
        const handleResize = () => {
            setY(window.innerHeight / 2 + 195);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return image && (
        <KonvaImage
            image={image}
            x={225}
            y={y}
            width={1500}
            height={1500 / 1.9}
            ref={imageRef}
        />
    );
});
