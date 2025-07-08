import React, { useEffect, useRef, useState } from 'react';
import { Image, Rect, Group } from 'react-konva';

const w = 250;

const TvVid = ({ play }) => {
    const videoRef = useRef(null);
    const imageRef = useRef(null);
    const [ready, setReady] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const getX = () => window.innerWidth / 2 - w / 2 - 230;
    const getY = () => window.innerHeight - w - 225;

    useEffect(() => {
        const updatePos = () => {
            setX(getX());
            setY(getY());
        };
        updatePos();
        window.addEventListener('resize', updatePos);
        return () => window.removeEventListener('resize', updatePos);
    }, []);

    useEffect(() => {
        const video = document.createElement('video');
        video.src = '/tv.mp4';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        videoRef.current = video;

        const anim = new window.Konva.Animation(() => {
            imageRef.current?.getLayer()?.batchDraw();
        });
        anim.start();

        setReady(true);

        return () => {
            anim.stop();
            video.pause();
        };
    }, []);

    useEffect(() => {
        if (play && videoRef.current && !videoReady) {
            videoRef.current.play()
                .then(() => setVideoReady(true))
                .catch(console.error);
        }
    }, [play]);

    if (!ready) return null;

    return (
        <Group>
            {play ? (
                <>
                    {/* Черная подложка ниже */}
                    <Rect
                        x={x}
                        y={y}
                        width={w}
                        height={w}
                        fill="black"
                        skewY={-0.1}
                        skewX={0.05}
                        listening={false}
                    />
                    {/* Видео выше */}
                    {videoReady && <Image
                        ref={imageRef}
                        image={videoRef.current}
                        x={x}
                        y={y}
                        width={w}
                        height={w}
                        skewY={-0.1}
                        skewX={0.05}
                        listening={false}
                    />}
                </>
            ) : (
                <>
                    {/* Видео ниже (не видно) */}
                    {videoReady && <Image
                        ref={imageRef}
                        image={videoRef.current}
                        x={x}
                        y={y}
                        width={w}
                        height={w}
                        skewY={-0.1}
                        skewX={0.05}
                        listening={false}
                    />}
                    {/* Черная заглушка выше */}
                    <Rect
                        x={x}
                        y={y}
                        width={w}
                        height={w}
                        fill="black"
                        skewY={-0.1}
                        skewX={0.05}
                        listening={false}
                    />
                </>
            )}
        </Group>
    );
};

export default TvVid;
