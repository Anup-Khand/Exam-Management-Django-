/* eslint-disable react/prop-types */
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteSubject } from "../../redux/feature/subject/SubjectSlice";
import { useState } from "react";
import DeleteModel from "../DeleteModel";

const SubjectTable = ({ data, EditForm }) => {
  // console.log(data)
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);

  // const handleClose = () => setShow(false);
  const handleShow = (info) => {
    setDeleteInfo(info);
    setShow(true);
  };

  const handleDeleteSubject = () => {
    if (deleteInfo) {
      const deletePayload = {
        sub_code: deleteInfo?.sub_code,
      };
      dispatch(deleteSubject(deletePayload));
      setShow(false);
      setDeleteInfo(null);
    }
  };
  const handleSubjectEdit = (singleData) => {
    EditForm(true, singleData);
  };
  return (
    <>
      <div className="TableContainer">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Code</th>
              <th>Subject name</th>
              <th>Faculty</th>
              <th>Semester</th>
              <th>Implemented Year</th>
              <th>Subject Type</th>
              <th>Syllabus</th>
              <th>Actions</th>
            </tr>
          </thead>
          {data?.length > 0 ? (
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.sub_code}</td>
                  <td>{item.name}</td>
                  <td>{item.faculty}</td>
                  <td>{item.semester}</td>
                  <td>{item.implement_year}</td>
                  <td>{item.sub_type}</td>
                  {/* <td>{item.syllabus}</td> */}
                  <td>
                    {item.syllabus !== null ? (
                      <a
                        href={`${import.meta.env.VITE_BACKEND1_URL}${
                          item.syllabus
                        }`}
                        download
                      >
                        Download
                      </a>
                    ) : (
                      "NO data"
                    )}
                  </td>
                  <td>
                    <Button onClick={() => handleSubjectEdit(item)}>
                      Edit
                    </Button>
                    <Button variant="primary" onClick={() => handleShow(item)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            "No data"
          )}
        </Table>
      </div>
      <DeleteModel
        deleteInfo={deleteInfo}
        showModal={show}
        onDelete={handleDeleteSubject}
        onClose={() => setShow(false)}
      />
    </>
  );
};

export default SubjectTable;
