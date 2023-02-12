

import './App.css'
import Form from './components/Form'
import {  Routes, Route } from "react-router-dom";
import Users from './components/Users'

function App() {
  

  return (
    <>
      <Routes>
                    <Route path="/users" element={<Users />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </>
  )
}

export default App
