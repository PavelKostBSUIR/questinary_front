import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

function AuthNavbar(props) {
  const navigate = useNavigate();
  const logOutProp = props.logOut;
  const logOut = () => {
    logOutProp();
    navigate("/");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/fields">
          QuestinaryApplication
        </Link>
        <div class="d-flex">
          <div class="navbar" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to="/fields">
                  fields
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/answers">
                  responses
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/questions">
                  questions
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Edit
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="dropdown-item" to="/editProfile">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/editPassword">
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={logOut}
                    >
                      Выйти
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AuthNavbar;
