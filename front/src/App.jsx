import animStore from './animStore';
import './App.scss';
import Canvas from './Canvas';



function App() {


  return (
    <div className='App' onClick={() => { animStore.shot() }}>

      {/* <Kill /> */}
      <Canvas />
    </div>
  )
}

export default App
