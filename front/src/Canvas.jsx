import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Sprite, Group } from 'react-konva';
import { observer } from 'mobx-react-lite';
import animStore from './animStore';

import BearIdle from './BearIdle';
import BearShot from './BearShot';
import PatchyHead from './PatchyHead';
import PatchyHand from './PatchyHand';
import PatchyBody from './PatchyBody';
import PatchyBlink from './PatchyBlink';
import PatchyShot from './PatchyShot';
import BearHole1 from './BearHole1';
import BearHole2 from './BearHole2';
import BearBlood from './BearBlood';



const SpriteAnimation = () => {

    const frameShot = useRef(0);
    const shotFramesCounter = useRef(0)
    const [showShot, setshowShot] = useState(false);

    const timerShotRef = useRef(null);
    const [currentFrameShot, setcurrentFrameShot] = useState(0);


    useEffect(() => {
        clearTimeout(timerShotRef.current)

        setshowShot(animStore.shotBearTrigger !== 0 ? true : false)

        if (animStore.shotBearTrigger !== 0) {

            shotFramesCounter.current = 0
            frameShot.current = -1

            const runFrame = () => {
                frameShot.current = (frameShot.current + 1) % animStore.framesCount;
                setcurrentFrameShot(frameShot.current)

                shotFramesCounter.current = shotFramesCounter.current + 1
                if (shotFramesCounter.current >= animStore.bearShotFramesCount) {
                    animStore.shotBearEnd()
                }
                timerShotRef.current = setTimeout(() => {
                    runFrame()
                }, 1000 / animStore.fps);
            }

            runFrame()

        } else {
            frameShot.current = -1

            const runFrame = () => {
                frameShot.current = (frameShot.current + 1) % animStore.framesCount;
                setcurrentFrameShot(frameShot.current)

                timerShotRef.current = setTimeout(() => {
                    runFrame()
                }, 1000 / animStore.fps);
            }
            runFrame()

        }


        return () => {
            clearTimeout(timerShotRef.current)
        }
    }, [animStore.shotBearTrigger])



    const frame = useRef(0);
    const [currentFrame, setcurrentFrame] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        frame.current = -1

        const runFrame = () => {
            frame.current = (frame.current + 1) % animStore.framesCount;
            setcurrentFrame(frame.current)

            timerRef.current = setTimeout(() => {
                runFrame()
            }, 1000 / animStore.fps);
        }

        runFrame()

        return () => {
            clearTimeout(timerRef.current)
        }
    }, [])


    return (
        <>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer
                    y={window.innerHeight / 8}
                >
                    {
                        window.innerWidth > 800 && <Group
                            x={
                                window.innerWidth > 1800
                                    ? window.innerWidth / 8
                                    : window.innerWidth < 1200
                                        ? -window.innerWidth / 6
                                        : 0
                            }

                        >
                            <BearBlood frame={currentFrameShot} show={showShot} />
                            <BearIdle frame={currentFrameShot} show={!showShot} />
                            <BearShot frame={currentFrameShot} show={showShot} />
                            <BearHole1 frame={currentFrameShot} show={showShot && animStore.shotBearTrigger < .5} />
                            <BearHole2 frame={currentFrameShot} show={showShot && animStore.shotBearTrigger >= .5} />
                        </Group>
                    }

                    <Group
                        x={
                            window.innerWidth > 1800
                                ? -window.innerWidth / 8
                                : window.innerWidth < 1200
                                    ? window.innerWidth < 800
                                        ? (- window.innerWidth + 100 + 500) + (window.innerWidth / 2) - 500 / 2
                                        : +window.innerWidth / 6
                                    : 0
                        }
                        y={
                            window.innerWidth < 800
                                ? -window.innerHeight / 16
                                : 0
                        }
                    >
                        <PatchyBody frame={currentFrame} />
                        <PatchyShot frame={currentFrameShot} show={showShot} />
                        <PatchyHand frame={currentFrameShot} show={!showShot} />
                        <PatchyHead frame={currentFrame} />
                        <PatchyBlink frame={currentFrame} />
                    </Group>

                </Layer>
            </Stage >
        </>
    );
};

export default observer(SpriteAnimation);