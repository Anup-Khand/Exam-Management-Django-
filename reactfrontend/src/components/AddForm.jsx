/* eslint-disable react/prop-types */
import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
// import { PostYear } from "../redux/feature/Year/PostYearSlice";
import {
  addSemester,
  updateSemester,
} from "../redux/feature/semester/GetSemesterSlice";
import {
  addFaculty,
  updateFaculty,
} from "../redux/feature/faculty/GetFacultySlice";
import { addYear, updateYear } from "../redux/feature/Year/GetYearSlice";
// import { useCrudContext } from "../../context/faculty/FacultyContext";

const Forrm = ({
  year,
  semester,
  faculty,
  sendDataToParent,
  sendcancel,
  editData = null,
}) => {
  const dispatch = useDispatch();

  const getPropertyName = () => {
    if (year) return "Year";
    if (semester) return "sem";
    if (faculty) return "name";
    return "";
  };
  const [data, setData] = useState({
    [getPropertyName()]: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    sendDataToParent(false);
    if (year) {
      dispatch(addYear(data));
    }
    if (semester) {
      dispatch(addSemester(data));
    }
    if (faculty) {
      dispatch(addFaculty(data));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      id: editData?.id,
      [getPropertyName()]: data[getPropertyName()],
    };
    console.log(updatedData);
    if (faculty) {
      dispatch(updateFaculty(updatedData));
    }
    if (year) {
      dispatch(updateYear(updatedData));
    }
    if (semester) {
      dispatch(updateSemester(updatedData));
    }
     sendcancel(false);
  };

  const handlecancel = () => {
    sendcancel(false);
  };
  return (
    <div className="formcontainer">
      {/* <div className="form"> */}
      <Form className="FacultyFormContainer" action="" method="post">
        <span  style={{cursor:"pointer"}} onClick={handlecancel}>X</span>
        <p>
          {year
            ? " Year"
            : semester
            ? " Semester"
            : faculty
            ? "Faculty"
            : ""}
        </p>
        <Form.Control
          value={data.name}
          className="mb-2"
          type="text"
          onChange={(e) =>
            setData({ ...data, [getPropertyName()]: e.target.value })
          }
          name={getPropertyName()}
          placeholder={
            year
              ? "Insert Year"
              : semester
              ? "Insert Semester"
              : faculty
              ? " Insert Faculty"
              : ""
          }
        />
        <Form.Control
          onClick={editData ? handleUpdate : handleSubmit}
          type="submit"
          value={editData ? "Update" : "Add"}
        />
      </Form>
    </div>
    // </div>
  );
};

export default Forrm;
