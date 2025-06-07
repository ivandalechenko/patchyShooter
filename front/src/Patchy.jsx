import { useEffect, useRef, useState } from 'react';
import './Patchy.scss';
import PatchyHand from './PatchyHand';
import animStore from './animStore';
import { observer } from "mobx-react-lite";



export default observer(() => {
    const frame = useRef(0);
    const [offsetX, setoffsetX] = useState(0);
    const [offsetY, setoffsetY] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            frame.current = (frame.current + 1) % animStore.framesCount;
            const x = -(frame.current % animStore.framesPerRow - 1)
            const y = -(Math.floor(frame.current / animStore.framesPerRow) - 1)
            // console.log(`x: ${x} y: ${y}`);

            setoffsetX(x)
            setoffsetY(y)
        }, 1000 / animStore.fps);

        return () => {
            clearInterval(interval)
        }
    }, [])




    return (
        <div className='Patchy' onClick={() => { animStore.shot() }}>
            <div className='Patchy_blink_wrapper free_img'>
                <div className='Patchy_blink'></div>
            </div>
            <div className='Patchy_shot_wrapper free_img'>
                <div className='Patchy_shot'></div>
            </div>
            <div className='Patchy_body_wrapper free_img'>
                <div className='Patchy_body' style={{
                    backgroundPosition: `${400 * offsetX}px ${337.5 * offsetY}px`
                }}></div>
            </div>

            <PatchyHand />

            <div className='Patchy_head_wrapper free_img'>
                <div className='Patchy_head' style={{
                    backgroundPosition: `${400 * offsetX}px ${337.5 * offsetY}px`
                }}></div>
            </div>
        </div>
    )
})