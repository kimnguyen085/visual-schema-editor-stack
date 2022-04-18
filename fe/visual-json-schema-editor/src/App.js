import './App.css';
import './assets/logo.svg';
import LeftLayout from "./layouts/LeftLayout";
import RightLayout from "./layouts/RightLayout";
import HeaderLayout from "./layouts/HeaderLayout";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className='App-body'>
          <div className='App-header'>
            <HeaderLayout/>
          </div>
          <div className="App-content">
            <LeftLayout/>
            <RightLayout/>
          </div>
          
        </div>
      </DndProvider>
    );
}

export default App;
