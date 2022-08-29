import logo from './logo.svg';
import './App.css';
import BoardingGame from '../src/pages/BoardingGame'
import SideBar from './components/SideBar'

function App() {
  return (
    <div className="App">
      <SideBar/>
      <BoardingGame/>
    </div>
  );
}

export default App;
