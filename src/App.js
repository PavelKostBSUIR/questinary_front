import React, { useState, useEffect } from "react";
import FieldsContainer from "./components/fields/fieldsContainer";
import AnswerForm from "./components/answers/answerForm";
import Pagination from "./components/Pagination";
import AnswerContainer from "./components/answers/answerContainer";
import RegistrationForm from "./components/authorities/registrationForm";
import AuthorizationForm from "./components/authorities/authorizationForm";
import Main from "./components/main";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <CookiesProvider>
      <Main />
    </CookiesProvider>
  );
}

export default App;
