import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Group } from 'react-konva';

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
import PatchyBlinkLeft from './PatchyBlinkLeft';
import PatchyBlinkRight from './PatchyBlinkRight';





const patchyHeadFramesCount = 61
const bearIdleFramesCount = 61
const patchyShotFramesCount = 21
const bearShotFramesCount = 21
const holeFramesCount = 21
const bloodFramesCount = 35


const FPS = 30


const SpriteAnimation = ({ shotTrigger }) => {
    const lastShotTrigger = useRef(null)

    const patchyMobRef = useRef(null)
    const patchyMobBlinkRef = useRef(null)

    const bearIdleRef = useRef(null)
    const bearIdleFrame = useRef(null)

    const bearShotRef = useRef(null)
    const bearShotFrame = useRef(null)

    const hole1Ref = useRef(null)
    const hole1Frame = useRef(null)

    const hole2Ref = useRef(null)
    const hole2Frame = useRef(null)

    const bloodRef = useRef(null)
    const bloodFrame = useRef(null)

    const patchyHeadRef = useRef(null)
    const patchyBodyRef = useRef(null)
    const patchyHeadFrame = useRef(null)

    const patchyHandIdleRef = useRef(null)
    const patchyHandIdleFrame = useRef(null)

    const patchyHandShotRef = useRef(null)
    const patchyHandShotFrame = useRef(null)

    // const patchyBlinkRef = useRef(null)
    const patchyBlinkLeftRef = useRef(null)
    const patchyBlinkRightRef = useRef(null)

    const oldBloodCount = useRef(null)
    const [oldBlood, setoldBlood] = useState(0);


    useEffect(() => {
        if (shotTrigger && shotTrigger !== lastShotTrigger.current) {
            lastShotTrigger.current = shotTrigger
            patchyHandShotFrame.current = 0
            console.log('shot');

            // setTimeout(() => {
            bearShotFrame.current = 0
            if (Math.random() > .5) {
                hole1Frame.current = 0
                hole2Frame.current = -1
            } else {
                hole2Frame.current = 0
                hole1Frame.current = -1
            }
            // setTimeout(() => {
            bloodFrame.current = 0

            const frameW = 396;
            const frameH = 146;
            const getX = () => window.innerWidth - (window.innerWidth - frameW / 2) - frameW;
            const getY = () => window.innerHeight - (window.innerHeight / 2 - frameH - frameH / 3) - frameH;

            oldBloodCount.current = Math.min(oldBloodCount.current + 1, 2);
            if (bloodRef.current) {
                bloodRef.current.x(getX() + [0, -100, 0][oldBloodCount.current - 1])
                bloodRef.current.y(getY() + [0, 300, -500][oldBloodCount.current - 1])
                bloodRef.current.rotation([0, -25, 40][oldBloodCount.current - 1])
                console.log(bloodRef.current);
            }

            setTimeout(() => {
                setoldBlood(oldBloodCount.current)
            }, 200);
            // }, 400);
            // }, 200);
        }
    }, [shotTrigger])


    useEffect(() => {


        let last = performance.now();
        let acc = 0;
        let frameId;

        const run = (time) => {
            const delta = time - last;
            acc += delta;
            last = time;

            if (acc >= 1000 / FPS) {
                acc = 0;
                // вызов runFrame как раньше
                runFrame();
            }

            frameId = requestAnimationFrame(run);
        };

        frameId = requestAnimationFrame(run);


        oldBloodCount.current = 0
        bearShotFrame.current = -1
        bloodFrame.current = -1
        patchyHandShotFrame.current = -1
        hole1Frame.current = -1
        hole2Frame.current = -1
        lastShotTrigger.current = 0
        const runFrame = () => {

            // добавляем все кадры
            bearIdleFrame.current = (bearIdleFrame.current + 1) % bearIdleFramesCount
            patchyHeadFrame.current = (patchyHeadFrame.current + 1) % patchyHeadFramesCount
            patchyHandIdleFrame.current = (patchyHandIdleFrame.current + 1) % patchyHeadFramesCount


            // если анимка уже отстрелялась то ну её нах
            // TASK
            // когда закончилась анимка, запускать с нулевого кадра айдл
            if (bearShotFrame.current + 1 === bearShotFramesCount) {
                bearIdleFrame.current = 0
                bearShotFrame.current = -1
            }
            if (patchyHandShotFrame.current + 1 === patchyShotFramesCount) {
                patchyHandShotFrame.current = -1
                patchyHandIdleFrame.current = 0
            }
            if (hole1Frame.current + 1 === holeFramesCount) hole1Frame.current = -1
            if (hole2Frame.current + 1 === holeFramesCount) hole2Frame.current = -1
            if (bloodFrame.current + 1 === bloodFramesCount) bloodFrame.current = -1


            // если анимка ещё не отстрелялась то проигрывать дальше
            if (bearShotFrame.current !== -1) bearShotFrame.current = bearShotFrame.current + 1
            if (patchyHandShotFrame.current !== -1) patchyHandShotFrame.current = patchyHandShotFrame.current + 1
            if (hole1Frame.current !== -1) hole1Frame.current = hole1Frame.current + 1
            if (hole2Frame.current !== -1) hole2Frame.current = hole2Frame.current + 1
            if (bloodFrame.current !== -1) bloodFrame.current = bloodFrame.current + 1


            // триггер анимки запускает нулевой кадр


            // тут менять перещёлкивать кадры
            patchyHeadRef.current?.frameIndex(patchyHeadFrame.current)
            patchyBodyRef.current?.frameIndex(patchyHeadFrame.current)
            patchyHandIdleRef.current?.frameIndex(patchyHandIdleFrame.current)
            patchyHandShotRef.current?.frameIndex(patchyHandShotFrame.current)
            patchyMobRef.current?.frameIndex(patchyHeadFrame.current)

            if (patchyHeadFrame.current === 0) {
                if (patchyBlinkLeftRef.current) patchyBlinkLeftRef.current.opacity(Math.random() < .7 ? 1 : 0);
                if (patchyBlinkRightRef.current) patchyBlinkRightRef.current.opacity(Math.random() < .7 ? 1 : 0);
                if (patchyMobBlinkRef.current) patchyMobBlinkRef.current.opacity(Math.random() < .7 ? 1 : 0);
            }
            patchyBlinkLeftRef.current?.frameIndex(patchyHeadFrame.current)
            patchyBlinkRightRef.current?.frameIndex(patchyHeadFrame.current - 2)
            patchyMobBlinkRef.current?.frameIndex(patchyHeadFrame.current)

            bearIdleRef.current?.frameIndex(bearIdleFrame.current);
            bearShotRef.current?.frameIndex(bearShotFrame.current);

            hole1Ref.current?.frameIndex(hole1Frame.current);
            hole2Ref.current?.frameIndex(hole2Frame.current);
            bloodRef.current?.frameIndex(bloodFrame.current);

            if (bearIdleRef.current) bearIdleRef.current.opacity(bearShotFrame.current >= 0 ? 0 : 1);
            if (bearShotRef.current) bearShotRef.current.opacity(bearShotFrame.current >= 0 ? 1 : 0);
            if (hole1Ref.current) hole1Ref.current.opacity(hole1Frame.current >= 0 ? 1 : 0);
            if (hole2Ref.current) hole2Ref.current.opacity(hole2Frame.current >= 0 ? 1 : 0);
            if (bloodRef.current) bloodRef.current.opacity(bloodFrame.current >= 0 ? 1 : 0);

            if (patchyHandIdleRef.current) patchyHandIdleRef.current.opacity(patchyHandShotFrame.current >= 0 ? 0 : 1);
            if (patchyHandShotRef.current) patchyHandShotRef.current.opacity(patchyHandShotFrame.current >= 0 ? 1 : 0);

            bearIdleRef.current?.getLayer()?.batchDraw();
            patchyHeadRef.current?.getLayer()?.batchDraw();
            // hole1Ref.current?.getLayer()?.batchDraw();


            // НИЖЕ ОТЛАДОЧНОЕ
            // console.log(`${bearIdleFrame.current}`);

            // const frm = 1

            // if (patchyBlinkLeftRef.current) patchyBlinkLeftRef.current.opacity(1);
            // if (patchyBlinkRightRef.current) patchyBlinkRightRef.current.opacity(1);
            // patchyHeadRef.current?.frameIndex(frm);
            // patchyBlinkLeftRef.current?.frameIndex(frm);
            // patchyBlinkRightRef.current?.frameIndex(frm);

            // patchyHandShotRef.current?.frameIndex(frm);
            // if (patchyHandShotRef.current) patchyHandShotRef.current.opacity(1);
            // if (patchyHandIdleRef.current) patchyHandIdleRef.current.opacity(0);
            // hole2Ref.current?.frameIndex(frm);
            // bearShotRef.current?.frameIndex(frm);
            // if (bearShotRef.current) bearShotRef.current.opacity(1);
        };


        return () => cancelAnimationFrame(frameId);

    }, [])


    const [canvasWidth, setcanvasWidth] = useState(window.innerWidth);
    const [canvasHeight, setcanvasHeight] = useState(window.innerHeight);
    const [bearX, setbearX] = useState(0);
    const [patchyX, setpatchyX] = useState(0);
    const [patchyY, setpatchyY] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const bearX = window.innerWidth > 1800
                ? window.innerWidth / 8
                : window.innerWidth < 1200
                    ? -window.innerWidth / 6
                    : 0;
            setbearX(bearX)

            const patchyX = window.innerWidth > 1800
                ? -window.innerWidth / 8
                : window.innerWidth < 1200
                    ? window.innerWidth < 800
                        ? (-window.innerWidth + 100 + 500) + (window.innerWidth / 2) - 250 + 20
                        : window.innerWidth / 6
                    : 0;
            setpatchyX(patchyX)

            const patchyY = window.innerWidth < 800 ? -window.innerHeight / 16 : 0;
            setpatchyY(patchyY)

            setcanvasWidth(window.innerWidth)
            setcanvasHeight(window.innerHeight)
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);





    return (
        <Stage width={canvasWidth} height={canvasHeight}>
            {/* Bear Layer */}
            {window.innerWidth > 800 && (
                <>
                    <Layer y={window.innerHeight / 8}>
                        <Group x={bearX}>
                            <BearIdle spriteRef={bearIdleRef} />
                            <BearShot spriteRef={bearShotRef} />
                        </Group>
                    </Layer>

                    <Layer y={window.innerHeight / 8}>
                        <Group x={bearX}>
                            <BearBlood spriteRef={bloodRef} oldBlood={oldBlood} />
                            <BearHole1 spriteRef={hole1Ref} />
                            <BearHole2 spriteRef={hole2Ref} />
                        </Group>
                    </Layer>

                    <Layer y={window.innerHeight / 8}>
                        <Group x={patchyX} y={patchyY}>
                            <PatchyBody spriteRef={patchyBodyRef} />
                            {/* Position done */}
                            {/*  */}
                            <PatchyHand spriteRef={patchyHandIdleRef} />
                            {/* Position */}
                            <PatchyShot spriteRef={patchyHandShotRef} />
                            {/*  */}
                            <PatchyHead spriteRef={patchyHeadRef} />
                            <PatchyBlinkLeft spriteRef={patchyBlinkLeftRef} />
                            <PatchyBlinkRight spriteRef={patchyBlinkRightRef} />

                        </Group>
                    </Layer>


                </>
            )}
            {window.innerWidth <= 800 &&
                <Layer>
                    <PatchyMob spriteRef={patchyMobRef} />
                    <PatchyMobBlink spriteRef={patchyMobBlinkRef} />
                </Layer>
            }
        </Stage>
    );
};

export default SpriteAnimation;


// STABLE