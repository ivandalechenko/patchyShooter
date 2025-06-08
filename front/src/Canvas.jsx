import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import { observer } from 'mobx-react-lite';
import animStore from './animStore';

import BearIdle from './BearIdle';
import BearShot from './BearShot';
import BearHole1 from './BearHole1';
import BearHole2 from './BearHole2';
import BearBlood from './BearBlood';

import PatchyHead from './PatchyHead';
import PatchyHand from './PatchyHand';
import PatchyBody from './PatchyBody';
import PatchyBlink from './PatchyBlink';
import PatchyShot from './PatchyShot';
import PatchyMob from './PatchyMob';
import PatchyMobBlink from './PatchyMobBlink';


const SpriteAnimation = () => {
    const frameShot = useRef(0);
    const shotFramesCounter = useRef(0);
    const [showShot, setShowShot] = useState(false);
    const [currentFrameShot, setCurrentFrameShot] = useState(0);
    const timerShotRef = useRef(null);

    useEffect(() => {
        clearTimeout(timerShotRef.current);
        setShowShot(animStore.shotBearTrigger !== 0);

        frameShot.current = -1;
        shotFramesCounter.current = 0;

        const runFrame = () => {
            frameShot.current = (frameShot.current + 1) % animStore.framesCount;
            setCurrentFrameShot(frameShot.current);

            if (animStore.shotBearTrigger !== 0) {
                shotFramesCounter.current += 1;
                if (shotFramesCounter.current >= animStore.bearShotFramesCount) {
                    animStore.shotBearEnd();
                }
            }

            timerShotRef.current = setTimeout(runFrame, 1000 / animStore.fps);
        };

        runFrame();

        return () => {
            clearTimeout(timerShotRef.current);
        };
    }, [animStore.shotBearTrigger]);

    const frame = useRef(0);
    const [currentFrame, setCurrentFrame] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        frame.current = -1;
        const runFrame = () => {
            frame.current = (frame.current + 1) % animStore.framesCount;
            setCurrentFrame(frame.current);
            timerRef.current = setTimeout(runFrame, 1000 / animStore.fps);
        };
        runFrame();

        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    const bearX = window.innerWidth > 1800
        ? window.innerWidth / 8
        : window.innerWidth < 1200
            ? -window.innerWidth / 6
            : 0;

    const patchyX = window.innerWidth > 1800
        ? -window.innerWidth / 8
        : window.innerWidth < 1200
            ? window.innerWidth < 800
                ? (-window.innerWidth + 100 + 500) + (window.innerWidth / 2) - 250 + 20
                : window.innerWidth / 6
            : 0;

    const patchyY = window.innerWidth < 800 ? -window.innerHeight / 16 : 0;

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            {/* Bear Layer */}
            {window.innerWidth > 800 && (
                <>
                    <Layer y={window.innerHeight / 8}>
                        <Group x={bearX}>
                            <BearIdle frame={currentFrameShot} show={!showShot} />
                            <BearShot frame={currentFrameShot} show={showShot} />
                            <BearBlood frame={currentFrameShot} show={showShot} />
                            <BearHole1 frame={currentFrameShot} show={showShot && animStore.shotBearTrigger < 0.5} />
                            <BearHole2 frame={currentFrameShot} show={showShot && animStore.shotBearTrigger >= 0.5} />
                        </Group>
                    </Layer>

                    <Layer y={window.innerHeight / 8}>
                        <Group x={patchyX} y={patchyY}>
                            <PatchyBody frame={currentFrame} />
                            <PatchyShot frame={currentFrameShot} show={showShot} />
                            <PatchyHand frame={currentFrameShot} show={!showShot} />
                            <PatchyHead frame={currentFrame} />
                            <PatchyBlink frame={currentFrame} />
                        </Group>
                    </Layer>
                </>
            )}
            {window.innerWidth <= 800 &&
                <Layer>
                    <PatchyMob frame={currentFrame} />
                    <PatchyMobBlink frame={currentFrame} />
                </Layer>
            }
        </Stage>
    );
};

export default observer(SpriteAnimation);
