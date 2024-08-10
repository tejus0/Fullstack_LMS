import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Form from "./pages/Form";

import Login from "./pages/Login/Login";
import SignUp from "./pages/Registration/SignUp";
import StudentProfile from "./pages/StudentProfile";
import { Toaster } from "react-hot-toast";
import AssignAuto from "./component/AssignAuto";
import CounsellorDashboard from "./pages/counsellor/Dashboard";
// import AdminDashboard from './pages/counsellor/Dashboard';
import ForgetPass from "./pages/Forgot-password/ForgetPass";
import ShowAllleads from "./pages/admin/showAllLeads";
import ArnavLeads from "./pages/arnav/arnavLeads";
import AgentLeads from "./pages/agent/AgentLeads";
import ProtectedRoute from "./component/ProtectedRoute";
import SchedulePicker from "./pages/admin-date-picker/SchedulePicker";
import TableShowSpecificLeads from "./pages/SpecificLeads/TableSpecificLeads";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SlotBooking from "./component/TimeSlot/SlotBooking";
import DaysAvaialble from "./pages/admin/DaysAvailable";
import ReportCards from "./pages/admin/Report/ReportCards";
import CounsellorTrackerDashboard from './pages/admin/CounsellorDashboard'
import OfficeDashboard from "./pages/admin/OfficeDashboard";
import { AdmissionHeadCounsellor } from "./pages/admissionHead/AdmissionHeadCounsellor";

// import AdminSlotSelect from "./pages/admin/AdminSlotSelect";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Form />} exact />
          <Route
            path="/counsellor-profile/:id"
            element={<ProtectedRoute><CounsellorDashboard /></ProtectedRoute>}
          />
          <Route path="/registration" element={<SignUp apiPath={"/register"} />} />
          <Route path="/student/:id" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
          <Route path="/assignAuto" element={<ProtectedRoute><AssignAuto /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ForgetPass />} />
          <Route path="/showAllLeads" element={<ProtectedRoute><ShowAllleads /></ProtectedRoute>} />
          <Route path="/showArnavAllLeads" element={<ArnavLeads />} />
          <Route path="/showSpecificLeads" element={<ProtectedRoute><TableShowSpecificLeads /> </ProtectedRoute>} />
          <Route path="/agentLeads" element={<ProtectedRoute><AgentLeads /></ProtectedRoute>} />
          <Route path="/hashed/codic/main/schedule" element={<SchedulePicker />} />
          {/* </Route> */}
          <Route path="/login" element={<Login />} />
          <Route path="/adminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/adminAvailableDays" element={<ProtectedRoute><DaysAvaialble /></ProtectedRoute>} />
          <Route path="/allCounsellorsReport" element={<ProtectedRoute><ReportCards /></ProtectedRoute>} />
          <Route path="/counsellorDashboard/:counsellorId" element={<ProtectedRoute><CounsellorTrackerDashboard /></ProtectedRoute>} />
          <Route path="/officeDashboard" element={<ProtectedRoute><OfficeDashboard /></ProtectedRoute>} />
          <Route path="/registerAdm" element={<SignUp apiPath={"/register"} pageFor="admissionHead" />} />
          <Route path="/forgot-pass" element={<ForgetPass />} />
          <Route path="/showCounsellorReport" element={<ProtectedRoute><AdmissionHeadCounsellor /></ProtectedRoute>} />
          {/* <Route path="/AdminSlotSelect" element={<AdminSlotSelect />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;