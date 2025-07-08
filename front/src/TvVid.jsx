import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

const w = 250

const TvVid = ({ }) => {
    const videoRef = useRef(null);
    const imageRef = useRef(null);
    const [ready, setReady] = useState(false); // 👈

    useEffect(() => {
        const videoElement = document.createElement('video');
        videoElement.src = '/tv.mp4';
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;

        videoRef.current = videoElement;

        videoElement.play()
            .then(() => setReady(true)) // 👈 запускаем повторный рендер
            .catch(err => console.error('Ошибка воспроизведения видео:', err));

        const updateCanvas = () => {
            imageRef.current?.getLayer()?.batchDraw();
        };

        const anim = new window.Konva.Animation(updateCanvas);
        anim.start();

        return () => {
            anim.stop();
            videoElement.pause();
        };
    }, []);


    const [y, setY] = useState(0);
    const [x, setX] = useState(0);


    const getX = () => window.innerWidth / 2 - w / 2 - 230
    const getY = () => window.innerHeight - w - 225

    useEffect(() => {
        const handleResize = () => {
            if (imageRef) {
                setX(getX());
                setY(getY());
            }
        };
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imageRef]);


    if (!ready || !videoRef.current) return null;

    return (
        <Image
            ref={imageRef}
            image={videoRef.current}
            x={x}
            y={y}
            width={w}
            height={w}
            skewY={-0.1}
            skewX={0.05}
        />
    );
};

export default TvVid;
