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
  addStudent,
  updateStudent,
} from "../redux/feature/Student/GetVerifiedStudent";
import { updateUnverifiedStudent } from "../redux/feature/Student/GetUnverifiedStudent";
// import Modal from "react-bootstrap/Modal";

function StudentForm({ setClick, editdata = null, verified, unverified }) {
  const dispatch = useDispatch();
  // const [edit, setEditdata] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    gender: "",
    faculty: "",
    Year: "",
    semester: "",
    Is_verified: "",
  });
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSem());
    dispatch(fetchYear());
  }, [dispatch]);

  useEffect(() => {
    if (editdata !== null) {
      setFormData(editdata);
      // setEditdata(editdata);
    }
  }, [editdata]);

  const { items: faculty } = useSelector((state) => state.getfaculty);
  const { items: sem } = useSelector((state) => state.semester);
  const { items: batch } = useSelector((state) => state.getyear);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = () => {
    setClick(false);
    editdata = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editdata) {
      if (unverified) {
        dispatch(updateUnverifiedStudent(formData));
      }
      if (verified) {
        dispatch(updateStudent(formData));
      }
    } else {
      dispatch(addStudent(formData));
    }
    setClick(false);
  };

  return (
    <div className="formcontainer">
      <Form className="StudentFormContainer" onSubmit={(e) => handleSubmit(e)}>
        <span onClick={handleClick}>X</span>

        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            className="inputForm"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          {editdata ? null : (
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          )}
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              className="inputForm"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGridPhoneno">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              className="inputForm"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <div className="upper-inputfield">
          <div className="radio-button">
            <input
              type="radio"
              id="option1"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="option1">male</label>
          </div>
          <div className="radio-button">
            <input
              type="radio"
              id="option2"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="option2">female</label>
          </div>
        </div>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Year</Form.Label>
            <Form.Select
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className=""
              defaultValue="Choose..."
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
            <Form.Label>Year</Form.Label>
            <Form.Select
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              className=""
              // defaultValue="Choose..."
            >
              <option value="" disabled>
                choose batch
              </option>
              {batch?.map((item) => (
                <option key={item.id} value={item.Year}>
                  {item.Year}
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
              // defaultValue="Choose..."
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

        {/* <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          {editdata ? "Update" : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default StudentForm;
