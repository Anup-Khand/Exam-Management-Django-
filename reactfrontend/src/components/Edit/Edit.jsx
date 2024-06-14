import { useState } from "react";
// import { useCrudContext } from "../../context/faculty/FacultyContext";

const EditableItem = () => {
  // const { deleteItem } = useCrudContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  // const [fid,setKey] = useState()

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // onTextChange(editedText);
    // onItemUpdate(id, editedText);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleDelete = () => {
    console.log("nax");
    // deleteItem({
    //   id: id,
    // });
  };

  return (
    <div className="items">
      <p onClick={handleDelete}>X</p>
      {isEditing ? (
        <input
          className="input-edit"
          type="text"
          value={editedText}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div className="items" onDoubleClick={handleDoubleClick}>
          {/* {initialText} */}
        </div>
      )}
    </div>
  );
};

export default EditableItem;
