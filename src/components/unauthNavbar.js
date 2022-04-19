import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

function UnauthNavbar(props) {
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
                <Link class="nav-link" to="/">
                  login
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/questions">
                  questions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UnauthNavbar;
