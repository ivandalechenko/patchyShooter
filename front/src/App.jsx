import { observer } from 'mobx-react-lite';
import animStore from './animStore';
import './App.scss';
import Canvas from './Canvas';
import Kill from './Kill';
import Media from './Media';


function App() {

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -((e.clientY / window.innerHeight) * 2 - 1); // инвертируем Y

    animStore.updateMouse(normX, normY);
  });

  return (
    <div className='App' onPointerDown={() => { animStore.shot() }}>
      <div className='App_noise'></div>
      <div className='App_header_wrapper free_img'>
        <div className='App_header' >
          <Kill />
        </div>
      </div>
      <Canvas />
      <div className='App_footer_wrapper free_img'>
        <div className='App_footer' >
          <Media />
        </div>
      </div>
    </div>
  )

}

export default observer(App)
