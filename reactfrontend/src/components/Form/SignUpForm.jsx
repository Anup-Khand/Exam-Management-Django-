/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { PostUnVerifyStudent } from "../../redux/feature/Student/PostUnverifiedStudentSlice";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const SignUpForm = ({ switchMode,setcancel }) => {
  const dispatch = useDispatch();
  const [faculty, setFaculty] = useState([]);
  const [batch, setBatch] = useState([]);
  const [sem, setSemester] = useState([]);
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
    Is_verified: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getFaculty = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}faculty/faculty/`
    );

    setFaculty(res?.data);
    if (res?.data.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        faculty: res.data[0].name,
      }));
    }
  };

  const getBatch = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}year/year/`
    );

    setBatch(res?.data);
    if (res?.data.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Year: res.data[0].Year,
      }));
    }
  };

  const getSemester = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}semester/semester/`
    );

    setSemester(res?.data);
    if (res?.data.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        semester: res.data[0].sem,
      }));
    }
  };

  useEffect(() => {
    getFaculty();
    getBatch();
    getSemester();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // const res = await axios.post(
    //   `${import.meta.env.VITE_BACKEND_URL}student/unverified/`,
    //   formData
    // );
    dispatch(PostUnVerifyStudent(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      gender: "",
      faculty: "",
      Year: "",
      semester: "",
      Is_verified: false,
    });

    setcancel(false)
  };

  return (
    <div className="form-container sign-up-container">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h1 className="signup-heading">Create Account</h1>
        <Row className="mb-3">
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
        </Row>
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
        </Row>
        <Row className="mb-2">
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
        <Row className=" mt-2 mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Faculty</Form.Label>
            <Form.Select
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className=""
              defaultValue="Choose..."
            >
              <option disabled>choose faculty</option>
              {faculty.map((item) => (
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
              defaultValue="Choose..."
            >
              <option disabled>choose batch</option>
              {batch.map((item) => (
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
              defaultValue="Choose..."
            >
              <option disabled>choose sem</option>
              {sem.map((item) => (
                <option key={item.id} value={item.sem}>
                  {item.sem}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <button className="ghost">Sign Up</button>
        <p className="switch" onClick={switchMode}>
          Already have an account? Login
        </p>
      </Form>
    </div>
  );
};
export default SignUpForm;
