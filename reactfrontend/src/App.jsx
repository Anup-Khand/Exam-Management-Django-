import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
// import StudentForm from './components/StudentForm'
// import Tables from './components/Tables/Tables'
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Student from "./pages/Student/Student";
import Faculty from "./pages/Faculty/Faculty";
import Year from "./pages/Year/Year";
// import AuthForm from "./pages/AuthFom/AuthForm";
import SignUpForm from "./components/Form/SignUpForm";
import Unverified from "./pages/Unverified/Unverified";
import Semester from "./pages/Semester/Semester";
import DashBoardHome from "./pages/Dashboard/DashBoardHome";
import Subject from "./pages/Subject/Subject";
import ResultForm from "./pages/Result/ResultForm";
// import Sidebar1 from "./components/Sidebar/MDSidebar"

function App() {
  return (
    <div className="grid-container">
      <BrowserRouter>
        <Sidebar />

        <div className="insidecontainer">
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path="" element={<DashBoardHome />} />
              <Route path="student" element={<Student />} />
              <Route path="faculty" element={<Faculty />} />
              <Route path="year" element={<Year />} />
              <Route path="semester" element={<Semester />} />
              <Route path="unverified" element={<Unverified />} />
              <Route path="subject" element={<Subject />} />
            </Route>
            <Route path="/auth" element={<SignUpForm />} />
            <Route path="/resultform" element={<ResultForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
