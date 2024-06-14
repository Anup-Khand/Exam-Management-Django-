/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../redux/feature/faculty/GetFacultySlice";
import { fetchSem } from "../redux/feature/semester/GetSemesterSlice";
import { fetchYear } from "../redux/feature/Year/GetYearSlice";
import {
  addSubject,
  updateSubject,
} from "../redux/feature/subject/SubjectSlice";

function StudentForm({ setClick, editdata = null }) {
  // console.log(editdata);
  const [edit, setEditdata] = useState({});
  const dispatch = useDispatch();
  const [isElective, setIsElective] = useState(false);
  const [formData, setFormData] = useState({
    sub_code: "",
    name: "",
    faculty: "",
    semester: "",
    implement_year: "",
    syllabus: null,
    sub_type: "compulsory",
  });

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSem());
    dispatch(fetchYear());

    return () => {
      console.log("clear");
      setEditdata({
        sub_code: "",
        name: "",
        faculty: "",
        semester: "",
        implement_year: "",
        syllabus: null,
        sub_type: "compulsory",
      });
    };
  }, [dispatch]);

  useEffect(() => {
    if (editdata !== null) {
      setFormData(editdata);
      setIsElective(editdata.sub_type === "elective");
      // setEditdata(editdata);
    }
  }, [editdata]);

  // console.log(edit);

  const { items: faculty } = useSelector((state) => state.getfaculty);
  const { items: sem } = useSelector((state) => state.semester);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "syllabus") {
      setFormData({
        ...formData,
        syllabus: files[0],
      });
    } else if (name === "sub_type") {
      setIsElective(e.target.checked);
      setFormData({
        ...formData,
        sub_type: e.target.checked ? "elective" : "compulsory",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleClick = () => {
    setClick(false);
    editdata = null;
  };

  const handleFormData = (e) => {
    e.preventDefault();
    console.log(formData);
    const uploadData = new FormData();
    uploadData.append("sub_code", formData.sub_code);
    uploadData.append("name", formData.name);
    uploadData.append("faculty", formData.faculty);
    uploadData.append("semester", formData.semester);
    uploadData.append("implement_year", formData.implement_year);
    uploadData.append("syllabus", formData.syllabus);
    uploadData.append("sub_type", formData.sub_type);
    if (editdata) {
      dispatch(updateSubject(uploadData));
    } else {
      dispatch(addSubject(uploadData));
    }
    setClick(false);
  };
  return (
    <div className="formcontainer">
      <Form
        className="StudentFormContainer"
        onSubmit={(e) => handleFormData(e)}
      >
        <span onClick={handleClick}>X</span>

        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Subject Code</Form.Label>
          <Form.Control
            type="text"
            className="inputForm"
            name="sub_code"
            value={formData.sub_code || edit?.sub_code}
            onChange={handleChange}
            placeholder="Enter Subject Code"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Subject name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Label>Implemented Year</Form.Label>
            <Form.Control
              type="text"
              className="inputForm"
              name="implement_year"
              value={formData.implement_year}
              onChange={handleChange}
              placeholder="Year"
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGridPhoneno">
            <Form.Label>Syllabus</Form.Label>
            <Form.Control
              type="file"
              className="inputForm"
              placeholder="Syllabus"
              name="syllabus"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Year</Form.Label>
            <Form.Select
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className=""
            >
              <option value="" disabled>
                choose faculty
              </option>
              {faculty?.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Semester</Form.Label>
            <Form.Select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className=""
            >
              <option value="" disabled>
                choose sem
              </option>
              {sem?.map((item) => (
                <option key={item.id} value={item.sem}>
                  {item.sem}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="Elective"
            name="sub_type"
            checked={isElective}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editdata ? "Update" : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default StudentForm;
