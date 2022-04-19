import React, { useEffect, useState } from "react";
import CheckBoxGroup from "./checkBoxGroup";
import RadioButtonGroup from "./radioButtonGroup";
import ComboBox from "./comboBox";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
//todo active and required check
function AnswerForm(props) {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState({});
  const { id } = useParams();
  const initAnswer = (question) => {
    const defAnswer = question.map((field) => {
      return { fieldId: field.id, options: [""] };
    });
    setAnswer(defAnswer);
  };
  useEffect(() => {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8100/answer/question/" + id, params)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        initAnswer(data);
        setQuestion([...data]);
      });
    //todo fetch question
  }, [id]);

  const setFieldOption = (options, id) => {
    const newAnswer = answer.map((field) => {
      return field.fieldId === parseInt(id)
        ? { fieldId: field.fieldId, options: options }
        : field;
    });
    setAnswer(newAnswer);
  };
  const getComponent = (field, content) => {
    return (
      <div class="row">
        <div class="col">
          <label for={field.fieldId} class="form-label">
            {field.label}
          </label>
        </div>
        <div class="col">{content}</div>
      </div>
    );
  };

  const saveAnswer = () => {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fieldAnswers: answer }),
    };
    fetch("http://localhost:8100/answer/add_answer/" + id, params).then(
      (res) => undefined
    );
  };
  return (
    <form>
      <div>
        {question.map((field) => {
          switch (field.type) {
            case "SINGLE_LINE_TEXT":
              const setOptionsSingle = (e) => {
                setFieldOption([e.target.value], e.target.id);
              };
              return getComponent(
                field,
                <input
                  type="text"
                  class="form-control"
                  id={field.id}
                  value={
                    answer.find(
                      (fieldAnswer) => fieldAnswer.fieldId === field.id
                    ).options[0]
                  }
                  onChange={setOptionsSingle}
                />
              );
            case "MULTILINE_TEXT":
              const setOptionsMulti = (e) => {
                setFieldOption([e.target.value], e.target.id);
              };
              return getComponent(
                field,
                <textarea
                  type="text"
                  class="form-control"
                  id={field.id}
                  value={
                    answer.find(
                      (fieldAnswer) => fieldAnswer.fieldId === field.id
                    ).options[0]
                  }
                  onChange={setOptionsMulti}
                />
              );
            case "RADIO_BUTTON":
              return getComponent(
                field,
                <RadioButtonGroup
                  id={field.id}
                  radios={field.options}
                  callback={setFieldOption}
                />
              );
            case "CHECKBOX":
              return getComponent(
                field,
                <CheckBoxGroup
                  id={field.id}
                  checkBoxes={field.options}
                  callback={setFieldOption}
                />
              );
            case "COMBOBOX":
              return getComponent(
                field,
                <ComboBox
                  id={field.id}
                  combos={field.options}
                  callback={setFieldOption}
                />
              );
            case "DATE":
              const setOptionsDate = (e) => {
                setFieldOption([e.target.value], e.target.id);
              };
              return getComponent(
                field,
                <input
                  type="date"
                  class="form-control"
                  id={field.id}
                  value={
                    answer.find(
                      (fieldAnswer) => fieldAnswer.fieldId === field.id
                    ).options[0]
                  }
                  onChange={setOptionsDate}
                />
              );
            default:
              return "";
          }
        })}
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-primary"
              id="save"
              onClick={saveAnswer}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default AnswerForm;
