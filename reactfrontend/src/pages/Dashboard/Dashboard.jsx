import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/DashNavbar/Navbar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div style={{padding: "0 1rem 0 1rem"}}>

      <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
