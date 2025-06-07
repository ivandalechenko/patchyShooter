import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import animStore from "./animStore";

export default observer(() => {
    const frame = useRef(0);
    const [offsetX, setoffsetX] = useState(0);
    const [offsetY, setoffsetY] = useState(0);
    const interval = useRef(0)
    const shotFramesCounter = useRef(0)
    const [showShot, setshowShot] = useState(false);

    useEffect(() => {
        if (animStore.shotTrigger !== 0) {
            setshowShot(true)

            shotFramesCounter.current = 0
            frame.current = -1
            clearInterval(interval.current)

            interval.current = setInterval(() => {

                frame.current = (frame.current + 1) % animStore.framesCount;
                const x = -(frame.current % animStore.framesPerRow - 1)
                const y = -(Math.floor(frame.current / animStore.framesPerRow) - 1)
                console.log(`frame: ${frame.current} x: ${x} y: ${y}`);

                setoffsetX(x)
                setoffsetY(y)
                shotFramesCounter.current = shotFramesCounter.current + 1
                if (shotFramesCounter.current >= animStore.shotFramesCount) {
                    animStore.shotEnd()
                }
            }, 1000 / animStore.fps);


        } else {
            setshowShot(false)
            frame.current = -1
            interval.current = setInterval(() => {
                frame.current = (frame.current + 1) % animStore.framesCount;
                const x = -(frame.current % animStore.framesPerRow - 1)
                const y = -(Math.floor(frame.current / animStore.framesPerRow) - 1)
                console.log(`frame: ${frame.current} x: ${x} y: ${y}`);

                setoffsetX(x)
                setoffsetY(y)
            }, 1000 / animStore.fps);
        }


        return () => {
            clearInterval(interval.current)
        }
    }, [animStore.shotTrigger])



    return (
        <>
            <div className='Patchy_hand_wrapper free_img'>
                <div className='Patchy_hand' style={{
                    opacity: showShot ? 0 : 1,
                    backgroundPosition: `${400 * offsetX}px ${337.5 * offsetY}px`,
                }}></div>
            </div>
            <div className='Patchy_shot_wrapper free_img'>
                <div className='Patchy_shot' style={{
                    opacity: showShot ? 1 : 0,
                    backgroundPosition: `${400 * offsetX}px ${337.5 * offsetY}px`,
                }}></div>
            </div>
        </>
    )
})