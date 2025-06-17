import { useState } from 'react';
import './Media.scss';
export default () => {

    const [ttHover, setttHover] = useState(false);
    const [instHover, setinstHover] = useState(false);

    return (
        <div className='Media'>
            <a href="https://x.com/PatchyOnSol" target='_blank'>
                <img src="/x.svg" alt="" />
            </a>
            <a href="https://t.me/PatchyOnSolana" target='_blank'>
                <img src="/tg.svg" alt="" />
            </a>
            <a href="https://dexscreener.com/solana/a8mbsuqkajmtsu42jdwphjko3vqc9srdfpdsf3sz5huf" target='_blank'>
                <img src="/dex.svg" alt="" />
            </a>
            <a href="https://www.tiktok.com/@patchyonsol" target='_blank'>
                <img src="/tt.svg" alt="" />
            </a>


            <a className='Media_inactive'
                onMouseEnter={() => { setinstHover(true) }}
                onMouseLeave={() => { setinstHover(false) }}
            >
                <img src={`${instHover ? '/soon.svg' : '/inst.svg'}`} className='Media_inactive_base' alt="" />
            </a>


        </div>
    )
}