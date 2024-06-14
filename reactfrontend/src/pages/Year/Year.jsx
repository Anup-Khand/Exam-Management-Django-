import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Year.css";
import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../../components/card/Card";
import { useEffect, useState } from "react";
import { fetchYear } from "../../redux/feature/Year/GetYearSlice";
import Forrm from "../../components/AddForm";

const Year = () => {
  const dispatch = useDispatch();
  const [editeddata, setEditedData] = useState(false);
  const [view, Setview] = useState(false);

  const handleDataFromChild = (data) => {
    Setview(data);
  };

  const handleForm = () => {
    Setview(!view);
      setEditedData(null);
  };

  const handlecanceldata = (data) => {
    Setview(data);
  };

  const handelEditForm = (view, data) => {
    console.log(view);
    Setview(view);
    console.log(data);
    setEditedData(data);
    // Setview(data)
  };

  const { items, loading, error } = useSelector((state) => state.getyear);

  useEffect(() => {
    dispatch(fetchYear());
  }, [dispatch]);

  const row = {
    justifyContent: "space-evenly",
  };

  return (
    <div>
      <button onClick={handleForm}>Add Year</button>
      <Container>
        <Row style={row} xs={1} md={2} lg={3}>
          {items.map((item, index) => (
            <CardComponent
              editdata={handelEditForm}
              year
              key={index}
              data={item}
            />
          ))}
        </Row>
      </Container>
      {view ? (
        <Forrm
          year
          editData={editeddata}
          sendDataToParent={handleDataFromChild}
          sendcancel={handlecanceldata}
        />
      ) : null}
    </div>
  );
};

export default Year;
