import { GoHome } from "react-icons/go";
import { PiStudent } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

const DashBoardHome = () => {
  return (
    <>
      <div className="dash-middle">
        <p>Welcome to your dashboard,Lumbini ICT Campus</p>
      </div>
      <div className="dash-last">
        <ul>
          <li>
            <span>
              <GoHome />
            </span>
            <div>
              <span className="content-title">Add other Admin</span>
              <p>
                Create rich course content and coaching products for your
                students. When you give them a pricing plan, they’ll appear on
                your site!
              </p>
            </div>
          </li>
          <li>
            <span>
              <PiStudent />
            </span>
            <div>
              <span className="content-title">Add other student</span>
              <p>
                Create rich course content and coaching products for your
                students. When you give them a pricing plan, they’ll appear on
                your site!
              </p>
            </div>
          </li>

          <li>
            <span>
              <SiGoogleclassroom />
            </span>
            <div>
              <span className="content-title">Add classes</span>
              <p>
                Create rich course content and coaching products for your
                students. When you give them a pricing plan, they’ll appear on
                your site!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashBoardHome;
