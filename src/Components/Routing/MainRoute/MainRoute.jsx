import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/Navbar/NavBar";

const MainRoute = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainRoute;
