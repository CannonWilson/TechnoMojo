import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './SignIn.js'
import Overview from './Overview.js'
import Lecture from './Lecture.js'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/overview' element={<Overview />} />
        <Route path='/lecture' element={<Lecture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
