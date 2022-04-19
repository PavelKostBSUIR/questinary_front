import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
function AuthorizationForm(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const isLogOut = props.isLogOut;
  const fetchAuthorizeUser = props.fetchAuthorizeUser;
  const navigate = useNavigate();

  const navigateToRegistration = () => {
    navigate("/registration");
  };
  useEffect(() => (isLogOut===false ? navigate("/fields") : undefined), [isLogOut]);
  return (
    <div>
      {isLogOut ? (
        <form>
          <div class="row  justify-content-md-center">
            <div class="col-lg-1">
              <label for="email" class="form-label">
                email
              </label>
            </div>
            <div class="col-md-auto">
              <input
                name="email"
                type="text"
                class="form-control"
                id="email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
          </div>

          <div class="row justify-content-md-center">
            <div class="col-lg-1">
              <label for="password" class="form-label">
                password
              </label>
            </div>
            <div class="col-md-auto">
              <input
                type="text"
                class="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div class="row justify-content-md-center">
            <div class="col-md-auto">
              <button
                type="button"
                class="btn btn-primary"
                id="save"
                onClick={() =>
                  fetchAuthorizeUser({
                    login: login,
                    password: password,
                  })
                }
              >
                Авторизоваться
              </button>
            </div>
            <div class="col-md-auto">
              <button
                type="button"
                class="btn btn-primary"
                onClick={navigateToRegistration}
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AuthorizationForm;
