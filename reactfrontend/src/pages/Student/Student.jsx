import { useEffect, useState } from "react";
import Navbar from "../../components/DashNavbar/Navbar";
import StudentForm from "../../components/StudentForm";
import Tables from "../../components/Tables/Tables";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { VerifiedStudent } from "../../redux/feature/Student/GetVerifiedStudent";

const Student = () => {
  const dispatch = useDispatch();

  const [viewForm, setViewForm] = useState(false);
  const [editdata, setEditData] = useState(null);

  const handleForm = () => {
    setViewForm(!viewForm);
    if (!viewForm) setEditData(null);
  };
  const handleEdit = (formView, singleData) => {
    // console.log(formView, singleData);
    setViewForm(formView);
    setEditData(singleData);
  };
  const setClick = (data) => {
    setViewForm(data);
  };

  useEffect(() => {
    dispatch(VerifiedStudent());
  }, [dispatch]);

  const { items, error, loading } = useSelector(
    (state) => state.verifiedstudent
  );

  return (
    <div className="StudentContainer">
      {/* <Navbar student /> */}
      <div className="middle">
        <Button onClick={handleForm} variant="primary">
          Add Student
        </Button>
      </div>
      <Tables EditForm={handleEdit} verified data={items} />
      {viewForm ? (
        <StudentForm verified editdata={editdata} setClick={setClick} />
      ) : null}
    </div>
  );
};

export default Student;
