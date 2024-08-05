import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseList from './layout/CourseList';
import AssignmentList from './layout/AssigmentList';
import SlotList from './layout/SlotList';
import CourseDetail from './layout/CourseDetail';
import SignIn from './layout/Login';
import SlotDetail from './layout/SlotDetail';
import AssignmentDetail from './layout/AssignmentDetail';
import RequireAuth from './components/RequireAuth';
import Home from './layout/Home';
import LoginTeacher from './layout/LoginTeacher';

const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/login' element={<SignIn />} />
          <Route path='/login-teacher' element={<LoginTeacher />} />
          <Route path='/' element={<Home />} />
          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.TEACHER]} />
            }
          >
            <Route path="/courses" element={<CourseList />} />
            <Route path='/assignments' element={<AssignmentList />} />
            <Route path='/slots' element={<SlotList />} />
            <Route path='/courses/:id' element={<CourseDetail />} />

            <Route path='/slots/:slotId/question/:questionId' element={<SlotDetail />} />
            <Route path='/slots/:slotId/assignments/:assignmentId' element={<AssignmentDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
