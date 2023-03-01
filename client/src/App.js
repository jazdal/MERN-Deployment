import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import AddProject from './components/AddProject';

export default function App() {
  document.querySelector("title").innerHTML = "Project Manager";
  const [authorized, setAuthorized] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard setAuthorized={setAuthorized} header="Project Manager" />} />
          <Route path="/sign_in" element={<LoginPage authorized={authorized} setAuthorized={setAuthorized} />} />
          <Route path="/logout" element={<Logout setAuthorized={setAuthorized}/>} />
          <Route path="/projects/new" element={<AddProject authorized={authorized}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}