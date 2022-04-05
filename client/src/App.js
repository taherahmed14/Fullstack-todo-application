import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Todo } from './components/Todo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/' element={<Login />} ></Route>
        <Route path='/todo' element={<Todo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
