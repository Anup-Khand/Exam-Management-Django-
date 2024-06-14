import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSem } from "../../redux/feature/semester/GetSemesterSlice";
import CardComponent from "../../components/card/Card";
import Forrm from "../../components/AddForm";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const Semester = () => {
  const dispatch = useDispatch();
  const [view, Setview] = useState(false);
  const [editeddata, setEditedData] = useState(false);

  const handleDataFromChild = (data) => {
    Setview(data);
  };

  const handleForm = () => {
    Setview(!view);
      setEditedData(null);
  };

  const handelEditForm = (view, data) => {
    console.log(view);
    Setview(view);
    console.log(data);
    setEditedData(data);
    // Setview(data)
  };
  const handlecanceldata = (data) => {
    Setview(data);
  };
  const row = {
    justifyContent: "space-evenly",
  };
  useEffect(() => {
    dispatch(fetchSem());
  }, [dispatch]);
  const { items, error, loading } = useSelector((state) => state.semester);

  return (
    <div>
      <button onClick={handleForm}>Add Semester</button>
      <Container>
        <Row style={row} xs={1} md={2} lg={3}>
          {items.map((item, index) => (
            <CardComponent
              editdata={handelEditForm}
              semester
              key={index}
              data={item}
            />
          ))}
        </Row>
      </Container>
      {view ? (
        <Forrm
          semester
          editData={editeddata}
          sendDataToParent={handleDataFromChild}
          sendcancel={handlecanceldata}
        />
      ) : null}
    </div>
  );
};

export default Semester;
