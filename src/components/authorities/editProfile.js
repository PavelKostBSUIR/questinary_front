import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
function EditUserForm(props) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const accessToken = props.accessToken;
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const navigateToFields = () => {
    navigate("/fields");
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(
    () =>
      user
        ? (setName(user.name),
          setSurname(user.surname),
          setPhoneNumber(user.phoneNumber))
        : undefined,
    [user]
  );
  const fetchUser = () => {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:8100/register/getUser", params)
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((data) => (data ? setUser(data) : undefined));
  };

  const fetchEditUser = () => {
    const newUser = {
      id: user.id,
      login: user.login,
      name: name,
      surname: surname,
      phoneNumber: phoneNumber,
      password: user.password,
      repeatedPassword: user.repeatedPassword,
    };
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(newUser),
    };
    fetch("http://localhost:8100/register/editUser", params)
      .then((res) => (res.status === 200 ? true : undefined))
      .then((data) => (data ? navigateToFields() : undefined));
  };
  return (
    <div>
      {user ? (
        <form>
          <div class="row">
            <div class="col">
              <label for=" name" class="form-label">
                name
              </label>
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                id=" name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label for="surname" class="form-label">
                surname
              </label>
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label for="phoneNumber" class="form-label">
                phoneNumber
              </label>
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button
                type="button"
                class="btn btn-primary"
                id="save"
                onClick={fetchEditUser}
              >
                Сохранить
              </button>
            </div>
            <div class="col">
              <button
                type="button"
                class="btn btn-primary"
                onClick={navigateToFields}
              >
                Назад
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default EditUserForm;
