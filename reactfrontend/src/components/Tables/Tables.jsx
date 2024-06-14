/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Table.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
// import { VerifyStudent } from "../../redux/feature/Student/StudentSlice";
import {
  deleteUnVerifiedStudent,
  verifyStudent,
} from "../../redux/feature/Student/GetUnverifiedStudent";
import { deleteVerifiedStudent } from "../../redux/feature/Student/GetVerifiedStudent";
import DeleteModel from "../DeleteModel";
import { useState } from "react";

const Tables = ({ unverified, verified, data,EditForm }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);

  const handleShow = (info) => {
    setDeleteInfo(info);
    setShow(true);
  };

  const handleVerify = (item) => {
    if (unverified) {
      const modifieddata = {
        ...item,
        Is_verified: true,
      };
      dispatch(verifyStudent(modifieddata));
    }
  };

  const handleEditForm = (singleData) => {
    EditForm(true, singleData);
  };

  const handleDelete = () => {
    if (deleteInfo) {
      if (verified) {
        const deleteId = {
          id: deleteInfo?.id,
        };
        dispatch(deleteVerifiedStudent(deleteId));
      }
      if (unverified) {
        const deleteId = {
          id: deleteInfo?.id,
        };
        dispatch(deleteUnVerifiedStudent(deleteId));
      }
    }
    setShow(false);
    setDeleteInfo(null);
  };

  return (
    <>
      <div className="TableContainer">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phoneno</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Faculty</th>
              <th>Semester</th>
              <th>Year</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? null : <td>No Data</td>}
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.gender}</td>
                <td>{item.faculty}</td>
                <td>{item.semester}</td>
                <td>{item.Year}</td>
                <td>
                  {unverified ? (
                    <Button onClick={() => handleVerify(item)}>Verify</Button>
                  ) : null}
                  <Button onClick={() => handleEditForm(item)}>Edit</Button>
                  <Button onClick={() => handleShow(item)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <DeleteModel
        deleteInfo={deleteInfo}
        showModal={show}
        onDelete={handleDelete}
        onClose={() => setShow(false)}
      />
    </>
  );
};

export default Tables;
