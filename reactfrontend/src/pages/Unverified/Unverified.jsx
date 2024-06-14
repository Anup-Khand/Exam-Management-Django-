import { useEffect, useState } from "react";
import Navbar from "../../components/DashNavbar/Navbar";
import StudentForm from "../../components/StudentForm";
import Tables from "../../components/Tables/Tables";
import { useDispatch, useSelector } from "react-redux";
import { UnVerifyStudent } from "../../redux/feature/Student/GetUnverifiedStudent";
// import Button from "react-bootstrap/Button";

const Unverified = () => {
  const dispatch = useDispatch();

  const [viewForm, setViewForm] = useState(false);
  const [editdata, setEditData] = useState(null);

  const handleEdit = (formView, singleData) => {
    // console.log(formView, singleData);
    setViewForm(formView);
    setEditData(singleData);
  };

  useEffect(() => {
    dispatch(UnVerifyStudent());
  }, [dispatch]);
  const {
    items = [],
    error,
    loading,
  } = useSelector((state) => state.unverifiedstudent) || {};

  console.log(items);
  const setClick = (data) => {
    setViewForm(data);
  };
  return (
    <div className="StudentContainer">
      {/* <Navbar /> */}
      <div className="middle"></div>
      <Tables EditForm={handleEdit} unverified data={items} />
      {viewForm ? (
        <StudentForm unverified editdata={editdata} setClick={setClick} />
      ) : null}
    </div>
  );
};

export default Unverified;
