import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

export default ({ play }) => {
    const [image, setImage] = useState(null);
    const [y, setY] = useState(() => window.innerHeight / 2 - 265);
    const [x, setX] = useState(0);


    const getX = () => window.innerWidth / 2 - image.width / 2 + 20
    const getY = () => window.innerHeight - image.height - 478



    useEffect(() => {
        const img = new window.Image();
        img.src = '/decor/arrow.webp';
        img.onload = () => {
            setImage(img);
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

    const [show, setshow] = useState(true);

    useEffect(() => {
        if (play) setshow(false)
    }, [play])

    return (image && show) ? <Image image={image} x={x} y={y} /> : null;
};
