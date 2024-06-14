import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import SubjectTable from "../../components/Tables/SubjectTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubject } from "../../redux/feature/subject/SubjectSlice";
import SubjectForm from "../../components/SubjectForm";
import Loader from "../../components/Loader";
const Subject = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubject());
  }, [dispatch]);
  const [viewForm, setViewForm] = useState(false);
  const [editdata, setEditData] = useState(null);

  const { items ,loading} = useSelector((state) => state.subject) || {};
  // console.log(items);

  const handleForm = () => {
    setViewForm(!viewForm);
    if (!viewForm) setEditData(null);
  };
  const setClick = (data) => {
    setViewForm(data);
  };

  const handleEdit = (formView, singleData) => {
    // console.log(formView, singleData);
    setViewForm(formView);
    setEditData(singleData);
  };
  return (
    <div>
      <div className="middle">
        <Button onClick={handleForm} variant="primary">
          Add Subject
        </Button>
      </div>
      {loading ? (
        <div style={{ display: "flex" ,justifyContent:"center",alignItems:"center",height:"50vh"}}>
          <Loader />
        </div>
      ) : (
        <SubjectTable EditForm={handleEdit} data={items} />
      )}

      {viewForm && <SubjectForm editdata={editdata} setClick={setClick} />}
    </div>
  );
};

export default Subject;
