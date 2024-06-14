import { configureStore } from "@reduxjs/toolkit";
import GetFacultyReducer from "./feature/faculty/GetFacultySlice";
import SemesterReducer from "./feature/semester/GetSemesterSlice";
import GetYearReducer from "./feature/Year/GetYearSlice";
import StudentReducer from "./feature/Student/StudentSlice";
import GetUnverifiedStudentReducer from "./feature/Student/GetUnverifiedStudent";
import GetVerifiedStudent from "./feature/Student/GetVerifiedStudent";
import PostUnverifiedStudentReducer from "./feature/Student/PostUnverifiedStudentSlice";
import SubjectReducer from "./feature/subject/SubjectSlice";
const store = configureStore({
  reducer: {
    getfaculty: GetFacultyReducer,
    semester: SemesterReducer,
    getyear: GetYearReducer,
    student: StudentReducer,
    unverifiedstudent: GetUnverifiedStudentReducer,
    verifiedstudent: GetVerifiedStudent,
    postunverifiedstudent: PostUnverifiedStudentReducer,
    subject: SubjectReducer,
  },
});
export default store;
