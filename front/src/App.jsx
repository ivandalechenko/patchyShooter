import { observer } from 'mobx-react-lite';
import animStore from './animStore';
import './App.scss';
import Canvas from './Canvas';
import Kill from './Kill';
import Media from './Media';
import { useEffect, useState } from 'react';


function App() {


  useEffect(() => {
    let latestX = 0;
    let latestY = 0;
    let rafId = 0;

    const handleMouseMove = (e) => {
      latestX = (e.clientX / window.innerWidth) * 2 - 1;
      latestY = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    let lastUpdate = 0;

    const loop = (time) => {
      if (time - lastUpdate >= 1000 / 24) {
        animStore.updateMouse(latestX, latestY);
        lastUpdate = time;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const [shotTrigger, setshotTrigger] = useState(0);


  return (
    <div className='App'
      onPointerDown={() => {
        setshotTrigger(Math.random())
      }}

    >
      {/* <div className='App_noise'></div> */}
      <div className='App_header_wrapper free_img'>
        <div className='App_header' >
          <Kill />
        </div>
      </div>
      <div className='App_canvas'>
        <Canvas shotTrigger={shotTrigger} />
      </div>
      <div className='App_footer_wrapper free_img'>
        <div className='App_footer' >
          <Media />
        </div>
      </div>
    </div>
  )

}

export default App
