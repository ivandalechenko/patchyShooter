import { useRef } from 'react';
import './App.scss';
import Canvas from './Canvas';
import Media from './Media';


function App() {

  const videoRef = useRef(null)

  const runVideo = () => {
    const vid = videoRef.current;
    vid.currentTime = 0;
    vid.style.opacity = 1;
    vid.style.pointerEvents = 'all';

    vid.play();


    setTimeout(() => {
      vid.style.transition = 'opacity 500ms';
      setTimeout(() => {
        vid.style.opacity = 0;
      }, 100);
      setTimeout(() => {
        vid.style.transition = 'none';
        vid.style.pointerEvents = 'none';
      }, 600);
    }, 3000);

  }


  return (
    <div className='App'>
      {
        window.innerWidth > 800 &&
        <div className='App_vid free_img'>
          <video src="/money.mp4" muted playsInline ref={videoRef} style={{
            opacity: 0,
            pointerEvents: 'none',
          }}></video>
        </div>
      }
      <div className='App_noise'></div>

      <div className='App_canvas'>
        <Canvas />
      </div>
      <div className='App_footer_wrapper free_img'>
        <div className='App_footer' >
          <Media />
        </div>
      </div>
      {
        window.innerWidth > 800 && <div className='App_interactive_wrapper free_img'>
          <div className='App_interactive' onClick={runVideo}>
          </div>
        </div>
      }
    </div>
  )

}

export default App
