import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './pages/Form';
// import Dashboard from './pages/Dashboard';
// import Followup from './component/FollowUp/Followup';
// import Registration from './pages/Registration/Registeration';
import Login from './pages/Login/Login';
import SignUp from './pages/Registration/SignUp';
import StudentProfile from './pages/StudentProfile';
import { Toaster } from 'react-hot-toast';
import AssignAuto from './component/AssignAuto';
import CounsellorDashboard from './pages/counsellor/Dashboard';
// import AdminDashboard from './pages/counsellor/Dashboard';
import ForgetPass from './pages/Forgot-password/ForgetPass';
import ShowAllleads from './pages/admin/showAllLeads';

// import Table from './pages/Table';
const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/' element={<Form />} />
          {/* <Route path='/fn' element={<Dashboard />} /> */}
          <Route path='/counsellor-profile/:id' element={<CounsellorDashboard />} />
          {/* <Route path='/profile' element={<Followup />} /> */}
          {/* <Route path='/register' element={<Registration />} /> */}
          <Route path='/registerationfinal' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/student/:id' element={<StudentProfile />} />
          <Route path='/assignAuto' element={<AssignAuto />} />
          <Route path='/forgot-password' element={<ForgetPass />} />
          <Route path='/showAllLeads' element={<ShowAllleads />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
