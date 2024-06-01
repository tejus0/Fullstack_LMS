import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './pages/Form';
import Dashboard from './pages/Dashboard';
import Followup from './component/FollowUp/Followup';
import Registration from './pages/Registration/Registeration';
import Login from './pages/Registration/LoginRegister/LoginRegister';
import SignUp from './pages/Registration/SignUp';

// import Table from './pages/Table';
const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/fn' element={<Dashboard />} />
          <Route path='/profile' element={<Followup />} />
          <Route path='/registeration' element={<Registration />} />
          <Route path='/registerationfinal' element={<SignUp />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
