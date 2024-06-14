import { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import AuthForm from "../../pages/AuthFom/AuthForm";
const Navbar = ({ student }) => {
  const [form, setForm] = useState(false);

  const handleForm = () => {
    setForm(!form);
  };
  const handleClose = () => {
    setForm(false);
  };
  return (
    <div className="dashboard-nav">
      <div className="dashNav-left">
        {student ? (
          <span>Student</span>
        ) : (
          <>
            <span>Admin</span>
            <p>Dashboard</p>
          </>
        )}
      </div>
      <div className="dashNav-right">
        <span>
          <CiBellOn />
        </span>
        <button onClick={handleForm}>Login</button>
      </div>
      {form ? <AuthForm setIsOpen={handleClose} /> : null}
    </div>
  );
};

export default Navbar;
