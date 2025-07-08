import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

export default () => {
    const [image, setImage] = useState(null);
    const [y, setY] = useState(() => window.innerHeight / 2 - 265);
    const [x, setX] = useState(0);


    const getX = () => window.innerWidth / 2 - image.width / 2
    const getY = () => window.innerHeight - image.height



    useEffect(() => {
        const img = new window.Image();
        img.src = '/decor/table.webp';
        img.onload = () => {
            setImage(img);
            setX(window.innerWidth / 2 - img.width / 2);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (image) {
                setX(getX());
                setY(getY());
            }
        };
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [image]);

    return image ? <Image image={image} x={x} y={y} /> : null;
};
