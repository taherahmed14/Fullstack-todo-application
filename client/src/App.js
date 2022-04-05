import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
