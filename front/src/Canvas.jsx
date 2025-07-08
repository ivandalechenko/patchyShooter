import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Group } from 'react-konva';

import Table from './Table';
import SofaBack from './SofaBack';
import SofaSide from './SofaSide';
import Body from './Body';
import Pic from './Pic';
import PhoneBase from './PhoneBase';
import TvVid from './TvVid';



import HeadPC from './HeadPC';
import HandPC from './HandPC';
import PhonePc from './PhonePC';

const headPCFramesCount = 81
const handPCFramesCount = 81
const phonePCFramesCount = 5

const FPS = 30


const SpriteAnimation = ({ }) => {

    const layerRef = useRef(null)

    const headPCRef = useRef(null)
    const headPCFrame = useRef(null)

    const handPCRef = useRef(null)
    const handPCFrame = useRef(null)

    const phonePCRef = useRef(null)
    const phonePCFrame = useRef(null)

    useEffect(() => {

        headPCFrame.current = 0;
        handPCFrame.current = 0;
        phonePCFrame.current = 0;

        let last = performance.now();
        let acc = 0;
        let frameId;

        const run = (time) => {
            const delta = time - last;
            acc += delta;
            last = time;

            if (acc >= 1000 / FPS) {
                acc = 0;
                runFrame();
            }

            frameId = requestAnimationFrame(run);
        };

        frameId = requestAnimationFrame(run);

        const runFrame = () => {
            headPCFrame.current = (headPCFrame.current + 1) % headPCFramesCount
            handPCFrame.current = (handPCFrame.current + 1) % handPCFramesCount
            phonePCFrame.current = (phonePCFrame.current + 1) % (phonePCFramesCount * 8)

            headPCRef.current?.frameIndex(headPCFrame.current);
            handPCRef.current?.frameIndex(handPCFrame.current);
            phonePCRef.current?.frameIndex(phonePCFrame.current > phonePCFramesCount * 4 ? 0 : phonePCFrame.current % phonePCFramesCount);

            layerRef.current?.batchDraw();
        };

        return () => cancelAnimationFrame(frameId);

    }, [])


    const [canvasWidth, setcanvasWidth] = useState(window.innerWidth);
    const [canvasHeight, setcanvasHeight] = useState(window.innerHeight);


    useEffect(() => {
        const handleResize = () => {
            setcanvasWidth(window.innerWidth)
            setcanvasHeight(window.innerHeight)
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);





    return (
        <Stage width={canvasWidth} height={canvasHeight}>
            <>

                {window.innerWidth > 800 &&
                    <Layer
                        ref={layerRef}
                        listening={false}
                    >
                        <TvVid />
                    </Layer>
                }
                <Layer listening={false} x={
                    window.innerWidth > 800 ? 0 : -450
                }>
                    <HandPC spriteRef={handPCRef} framesCount={handPCFramesCount} />
                    <SofaBack />
                    <Table />
                    <Body />
                    <SofaSide />
                    <HeadPC spriteRef={headPCRef} framesCount={headPCFramesCount} />

                    {window.innerWidth > 800 &&
                        <>
                            <Pic />
                            <PhonePc spriteRef={phonePCRef} framesCount={phonePCFramesCount} />
                            <PhoneBase />
                        </>
                    }
                </Layer>

            </>
            {/* )} */}

        </Stage>
    );
};

export default SpriteAnimation;

