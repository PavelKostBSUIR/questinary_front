import React, { useState, useEffect } from "react";
import AddFieldForm from "./addFieldForm";
import DeleteFieldForm from "./deleteFieldForm";
import FieldTable from "./FieldTable";
import Pagination from "../Pagination";
function FieldsContainer(props) {
  const accessToken = props.accessToken;
  const [pageLoaded, SetPageLoaded] = useState(false);
  const [fieldsPage, setFieldsPage] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [field, setField] = useState({});
  const maxPages = 5;
  const [size, setSize] = useState(5);
  const setDefField = () => {
    setField({
      id: "",
      active: false,
      label: "",
      required: false,
      type: "SINGLE_LINE_TEXT",
      options: [],
    });
  };
  useEffect(() => {
    fieldsPage.content ? setIsLoaded(true) : setIsLoaded(false);
  }, [fieldsPage]);
  useEffect(() => fetchGetFieldsPage(0), [size]);
  const fetchGetFieldsPage = (page) => {
    if (size !== "") {
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      fetch(
        "http://localhost:8100/field?page=" + page + "&size=" + size,
        params
      )
        .then((res) => res.json())
        .then((data) => {
          setFieldsPage(data);
          SetPageLoaded(true);
        });
    }
  };

  const fetchAddField = (field) => {
    if (field.options.length > 0) field.options = field.options.split("\n");
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(field),
    };
    fetch("http://localhost:8100/field", params).then((res) => {
      fetchGetFieldsPage(0);
    });
    //todo fetchGetFieldsAfterAddIfOk
  };

  const fetchDeleteField = (field) => {
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    fetch("http://localhost:8100/field/" + field.id, params).then((res) => {
      fetchGetFieldsPage(0);
    });
    //todo fetchGetFieldsAfterAddIfOk
  };

  const fetchUpdField = (field) => {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(field),
    };
    fetch("http://localhost:8100/field/" + field.id, params).then((res) => {
      //todo maybe fetch 0 page
      fetchGetFieldsPage(fieldsPage.pageable.pageNumber);
    });
    //todo fetchGetFieldsAfterAddIfOk
  };

  const setNewField = (e) => {
    setField(
      fieldsPage.content.find((field) => field.id === parseInt(e.target.id))
    );
  };

  return (
    <div>
      {pageLoaded ? (
        <div>
          {isLoaded ? (
            <div>
              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={setDefField}
                  >
                    Добавить поле
                  </button>
                </div>
              </div>
              <div class="row justify-content-md-center">
                <div class="col">
                  <FieldTable
                    fields={fieldsPage.content}
                    setField={setNewField}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <Pagination
                    currentPage={fieldsPage.pageable.pageNumber}
                    totalPages={fieldsPage.totalPages}
                    maxPages={maxPages}
                    callback={fetchGetFieldsPage}
                  />
                </div>
                <div class="col-3">
                  <input
                    value={size}
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>Loading filedsPage...</div>
          )}

          <AddFieldForm
            ident="exampleModal"
            field={field}
            setField={setField}
            callback={fetchAddField}
            title="Добавить новое поле"
          />

          <AddFieldForm
            ident="exampleModal_2"
            field={field}
            setField={setField}
            callback={fetchUpdField}
            title="Редактировать поле"
          />
          <DeleteFieldForm
            ident="exampleModal_3"
            field={field}
            setField={setField}
            callback={fetchDeleteField}
          />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default FieldsContainer;
