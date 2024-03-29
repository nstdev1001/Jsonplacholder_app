import { Suspense, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { NavLink } from "react-router-dom";
import style from "./styles/style.module.css";
import Users from "./components/Users";
import Photos from "./components/Photos";
import UsersInfor from "./components/UsersInfor";

function App() {
  const [activeLink, setActiveLink] = useState(null);

  // Function to handle link click
  const handleNavLinkClick = (event: any) => {
    setActiveLink(event.target.innerText);
  };
  return (
    <>
      <BrowserRouter>
        <nav
          className={`${style.navBar} navbar navbar-expand navbar-dark bg-dark`}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="collapse navbar-collapse">
                  <NavLink
                    to="users"
                    className={`nav-link text-white px-0 pe-4 ${
                      activeLink === "Users" ? "fw-bold" : ""
                    }`}
                    onClick={handleNavLinkClick}
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to="photos"
                    className={`nav-link text-white px-0 pe-4 ${
                      activeLink === "Photos" ? "fw-bold" : ""
                    }`}
                    onClick={handleNavLinkClick}
                  >
                    Photos
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="users" element={<Users />}></Route>
            <Route path="users/:userId" element={<UsersInfor />} />
            <Route path="photos" element={<Photos />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
