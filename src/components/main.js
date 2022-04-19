import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FieldsContainer from "./fields/fieldsContainer";
import AnswerForm from "./answers/answerForm";
import AuthorizationForm from "./authorities/authorizationForm";
import RegistrationForm from "./authorities/registrationForm";
import AnswerContainer from "./answers/answerContainer";
import QuestionsContainer from "./answers/questionsContainer";
import AuthNavbar from "./authNavbar";
import EditUserForm from "./authorities/editProfile";
import EditPasswordForm from "./authorities/editPasswordForm";
import UnauthNavbar from "./unauthNavbar";
import { useCookies } from "react-cookie";

function Main() {
  //todo route if logged n3ad unlogged
  const [isLogOut, setIsLogOut] = useState(true); //getting logout by refresh token
  const [isLoaded, setIsLoaded] = useState(false);
  const [timerId, SetTimerId] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isError, setIsError] = useState(true);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    cookies.refreshToken === undefined
      ? setIsLogOut(true)
      : fetchRefreshTokens(cookies.refreshToken);
  }, []);
  //if user where logged it sets timer and getting new tokens,else you can be logged out
  //and should clear tokens from ccookies and state and clear interval,
  //but if you have not been logged yet you should login
  useEffect(
    () =>
      isLogOut === false && isLoaded === true
        ? (
          SetTimerId(
            setInterval(
              () =>
                !isReady
                  ? (setIsReady(true))
                  : (undefined),
              100000
            )
          ))
        : isLoaded === true
        ? (
          clearInterval(timerId),
          removeCookies(),
          setIsLoaded(false))
        : (undefined),
    [isLogOut]
    //setting accesstoken and refresh token to null if they are ""
  );
  useEffect(
    () => (isReady ? fetchRefreshTokens(cookies.refreshToken) : undefined),
    [isReady]
  );
  //if tokens where not loaded then load them
  useEffect(
    () =>
      isLoaded === true &&
      isLogOut === true &&
      cookies.accessToken &&
      cookies.refreshToken
        ? (
          setIsLogOut(false))
        : (undefined),
    [cookies, isLoaded]
  );
  useEffect(
    () =>
      isError === false &&
      isLoaded === false &&
      cookies.accessToken &&
      cookies.refreshToken
        ? (setIsLoaded(true))
        : isError === true
        ? (setIsLogOut(true), setIsLoaded(false))
        : (undefined),
    [cookies, isError]
  );

  const logOut = () => {
    setIsLogOut(true);
    //setIsLoaded(false);
    removeCookies();
  };
  const fetchAuthorizeUser = (JWTRequest) => {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JWTRequest),
    };
    fetch("http://localhost:8100/api/auth/login", params)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCookies(data.accessToken, data.refreshToken);
          setIsError(false);
        } else {
          setIsError(true);
        }
      });
  };

  const setCookies = (accessToken, refreshToken) => {
    setCookie("accessToken", accessToken);
    setCookie("refreshToken", refreshToken);
  };
  const removeCookies = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
  };
  const fetchRefreshTokens = (refreshToken) => {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    };
    fetch("http://localhost:8100/api/auth/refresh", params)
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((data) => {
        if (data) {
          setCookies(data.accessToken, data.refreshToken);
          setIsError(false);
          setIsReady(false);
        } else {
          setIsError(true);
        }
      });
  };

  //we can add condition, if loaded then check log and dest by / fields
  return (
    <div>
      <BrowserRouter>
        {!isLogOut ? <AuthNavbar logOut={logOut} /> : <UnauthNavbar />}
        <Routes>
          <Route
            path="/"
            element={
              <AuthorizationForm
                fetchAuthorizeUser={fetchAuthorizeUser}
                isLogOut={isLogOut}
              />
            }
          />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route
            path="/fields"
            element={<FieldsContainer accessToken={cookies.accessToken} />}
          />
          <Route
            path="/answers"
            element={<AnswerContainer accessToken={cookies.accessToken} />}
          />
          <Route path="/questions" element={<QuestionsContainer />} />
          <Route path="/addAnswer/:id" element={<AnswerForm />} />
          <Route
            path="/editProfile"
            element={<EditUserForm accessToken={cookies.accessToken} />}
          />
          <Route
            path="/editPassword"
            element={<EditPasswordForm accessToken={cookies.accessToken} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
