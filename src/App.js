import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './views/sign_in/SignIn.js'
import Overview from './views/overview/Overview.js'
import Lecture from './views/lecture/Lecture.js'
import Admin from './admin/Admin.js'
import NotFound from './views/not_found/NotFound.js'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/overview' element={<Overview />} />
        <Route path='/lecture' element={<Lecture />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
