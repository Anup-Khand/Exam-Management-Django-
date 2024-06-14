// import { useEffect, useState } from "react";
// import "./Faculty.css";
// import { useCrudContext } from "../../context/faculty/FacultyContext";
// import Forrm from "./Forrm";
// const Faculty = () => {
//   const { state, fetchItems } = useCrudContext();

//   const [view, Setview] = useState(false);

//   const handleDataFromChild = (data) => {
//     Setview(data);
//   };

//   const handleForm = () => {
//     Setview(!view);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   return (
//     <div className="FacultyContainer">
//       <p className="heading">List of Faculty</p>
//       <button onClick={handleForm}>Add Faculty</button>
//       <div className="listcontainer">
//         {state?.items ? (
//           state?.items.map((item, index) => (
//             <div className="items" key={index}>
//               {item.name}
//             </div>
//           ))
//         ) : (
//           <p>No Data</p>
//         )}
//       </div>
//       {view ? <Forrm sendDataToParent={handleDataFromChild} /> : null}
//     </div>
//   );
// };

// export default Faculty;

import { useEffect, useState } from "react";
import "./Faculty.css";
import Forrm from "../../components/AddForm"
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import CardComponent from "../../components/card/Card";
import { fetchItems } from "../../redux/feature/faculty/GetFacultySlice";

const Faculty = () => {
  const dispatch = useDispatch();

  const [view, Setview] = useState(false);
    const [editeddata, setEditedData] = useState(false);

  const handleDataFromChild = (data) => {
    Setview(data);
  };

  const handleForm = () => {
    Setview(!view);
    setEditedData(null)
  };

  const handlecanceldata = (data) => {
    Setview(data);
  };

  const { items, error, loading } = useSelector((state) => state.getfaculty) || {};
  console.log(items);
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const row = {
    justifyContent: "space-evenly",
  };

  const handelEditForm = (view,data) => {
    console.log(view)
    Setview(view)
    console.log(data)
    setEditedData(data)
    // Setview(data)
  }

  return (
    <div className="SideContainer">
      <p className="heading">List of Faculty</p>
      <button onClick={handleForm}>Add Faculty</button>
      <Container>
        <Row style={row} xs={1} md={2} lg={3}>
          {items?.map((item, index) => (
            <CardComponent
              editdata={handelEditForm}
              faculty
              key={index}
              data={item}
            />
          ))}
        </Row>
      </Container>
      {view ? (
        <Forrm
          faculty
          sendDataToParent={handleDataFromChild}
          sendcancel={handlecanceldata}
          editData={editeddata}
        />
      ) : null}
    </div>
  );
};

export default Faculty;
