// import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { deleteFaculty, updateFaculty } from "../../redux/feature/faculty/GetFacultySlice";
import { deleteSemester } from "../../redux/feature/semester/GetSemesterSlice";
import { deleteYear } from "../../redux/feature/Year/GetYearSlice";

function CardComponent({ semester, data, year, faculty,editdata }) {
  const dispatch = useDispatch()
  const [name, setName] = useState("");

  useEffect(() => {
    if (semester) {
      const { sem } = data || {};
      setName(sem);
    }
    if (year) {
      const { Year } = data || {};
      setName(Year);
    }
    if (faculty) {
      const { name } = data || {};
      setName(name);
    }
  }, [data, semester, year, faculty]);

  const handleDelete = () => {
    if (faculty) {
      console.log(data)
      dispatch(deleteFaculty(data));
    }
     if (semester) {
       console.log(data);
       dispatch(deleteSemester(data));
    }
     if (year) {
       console.log(data);
       dispatch(deleteYear(data));
     }
  }

  const handleUpdate = () => {
    editdata(true, data)
  }
  return (
    <Card style={{ width: "12rem" }}>
      <Card.Body style={{ alignItems: "center" }}>
        <Card.Title>{semester ? "Semester" : year ? "Year" : null}</Card.Title>
        <Card.Text>{name}</Card.Text>
        <div className="d-flex gap-3" >
          <span onClick={handleUpdate} className="Card-btn">Edit</span>
          <span onClick={handleDelete} className="Card-btn">Delete</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
