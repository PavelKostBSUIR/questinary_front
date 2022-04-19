import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
function EditPasswordForm(props) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const accessToken = props.accessToken;
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const navigateToFields = () => {
    navigate("/fields");
  };
  const fetchEditUser = () => {
    const passwords = {
      newPassword: newPassword,
      currentPassword: currentPassword,
    };
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(passwords),
    };
    fetch("http://localhost:8100/register/editPassword", params)
      .then((res) => (res.status === 200 ? true : undefined))
      .then((data) => (data ? navigateToFields() : undefined));
  };
  return (
    <div>
      <form>
        <div class="row">
          <div class="col">
            <label for=" name" class="form-label">
              Current Password
            </label>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              id=" name"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="surname" class="form-label">
              New Password
            </label>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="surname"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="phoneNumber" class="form-label">
              Confirm New Password
            </label>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="phoneNumber"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
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
    </div>
  );
}

export default EditPasswordForm;
