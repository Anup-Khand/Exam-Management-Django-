import "./Sidebar.css";
import logo from "../../assets/951581.jpg";
import { CiHome } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="SidebarContainer">
      <div className="upper-sidebar">
        <img className="image" src={logo} alt="" />
        <p>Lumbini ICT Campus</p>
      </div>
      <div className="nav-sidebar">
        <ul>
          <li>
            <NavLink className="link" to="/">
              <span>
                <CiHome />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/student">
              <span></span>
              <span>Student</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/year" className="link">
              <span></span>
              <span>Year</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/faculty" className="link">
              <span></span>
              <span>Faculty</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/semester" className="link">
              <span></span>
              <span>Semester</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/unverified" className="link">
              <span></span>
              <span>Unverified</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/subject" className="link">
              <span></span>
              <span>Subjects</span>
            </NavLink>
          </li>
          

          {/* <li className="has-children">
              <a href="#">
                <i className="fa fa-info-circle" /> <span>Result</span>
                <i className="fa fa-angle-right arrow" />
              </a>
              <ul className="child-nav">
                <li>
                  <a href="add-result.php">
                    <i className="fa fa-bars" /> <span>Add Result</span>
                  </a>
                </li>
                <li>
                  <a href="manage-results.php">
                    <i className="fa fa fa-server" /> <span>Manage Result</span>
                  </a>
                </li>
              </ul>
            </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
