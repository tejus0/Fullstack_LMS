import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './pages/Form';
import Dashboard from './pages/Dashboard';
const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/fn' element={<Dashboard />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
