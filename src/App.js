
import './App.css';
import Campaign from './pages/Campaign'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkSpaces from './pages/WorkSpaces.js'

function App() {
////

  return(
  <>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkSpaces />}></Route>
        <Route path="/Campaign/:workspaceId" element={<Campaign />}></Route>
      </Routes>
    </BrowserRouter>

  </>
  )
}

export default App