import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
function RegistrationForm() {
  const id = null;
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const navigate = useNavigate();

  const navigateToAuthorization = () => {
    navigate("/");
  };
  const fetchRegisterUser = () => {
    const user = {
      id: id,
      login: login,
      name: name,
      surname: surname,
      phoneNumber: phoneNumber,
      password: password,
      repeatedPassword: repeatedPassword,
    };
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:8100/register/registrate", params).then((res) =>
      navigateToAuthorization()
    );
  };
  return (
    <form>
      <div class="row justify-content-md-center">
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

      <div class="row  justify-content-md-center">
        <div class="col-lg-1">
          <label for="repeatedPassword" class="form-label">
            repeatedPassword
          </label>
        </div>
        <div class="col-md-auto">
          <input
            type="text"
            class="form-control"
            id="repeatedPassword"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
          />
        </div>
      </div>

      <div class="row justify-content-md-center">
        <div class="col-lg-1">
          <label for=" name" class="form-label">
            name
          </label>
        </div>
        <div class="col-md-auto">
          <input
            type="text"
            class="form-control"
            id=" name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div class="row justify-content-md-center">
        <div class="col-lg-1">
          <label for="surname" class="form-label">
            surname
          </label>
        </div>
        <div class="col-md-auto">
          <input
            type="text"
            class="form-control"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
      </div>

      <div class="row justify-content-md-center">
        <div class="col-lg-1">
          <label for="phoneNumber" class="form-label">
            phoneNumber
          </label>
        </div>
        <div class="col-md-auto">
          <input
            type="text"
            class="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-md-auto">
          <button
            type="button"
            class="btn btn-primary"
            id="save"
            onClick={fetchRegisterUser}
          >
            Зарегистрироваться
          </button>
        </div>
        <div class="col-md-auto">
          <button
            type="button"
            class="btn btn-primary"
            onClick={navigateToAuthorization}
          >
            Авторизоваться
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;
