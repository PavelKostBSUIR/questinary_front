import React, { useState, useEffect } from "react";
import AddFieldForm from "./addFieldForm";
import DeleteFieldForm from "./deleteFieldForm";
import FieldTable from "./FieldTable";
import Pagination from "../Pagination";
function FieldsContainer() {
  const [pageLoaded, SetPageLoaded] = useState(false);
  const [fieldsPage, setFieldsPage] = useState({
    content: [],
    pageable: {
      pageNumber: 0,
    },
    totalPages: 0,
  });
  const [field, setField] = useState({});
  const maxPages = 5;
  const [size, setSize] = useState(5);
  const setDefField = () => {
    console.log("someone chanched");
    setField({
      id: "",
      isActive: false,
      label: "",
      required: false,
      type: "SINGLE_LINE_TEXT",
      options: [],
    });
  };

  useEffect(() => fetchGetFieldsPage(0), [size]);
  const fetchGetFieldsPage = (page) => {
    if (size !== "") {
      console.log("fetching");
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
          console.log(data.totalPages);
        });
    }
  };

  const fetchAddField = (field) => {
    if (field.options.length > 0) field.options = field.options.split("\n");
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(field),
    };
    fetch("http://localhost:8100/field", params).then((res) => {
      console.log(res.status);
      fetchGetFieldsPage(0);
    });
    //todo fetchGetFieldsAfterAddIfOk
  };

  const fetchDeleteField = (field) => {
    console.log("deelte field" + JSON.stringify(field));
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8100/field/" + field.id, params).then((res) => {
      console.log(res.status);
      fetchGetFieldsPage(0);
    });
    //todo fetchGetFieldsAfterAddIfOk
  };

  const fetchUpdField = (field) => {
    console.log("UpdatedField" + JSON.stringify(field));
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(field),
    };
    fetch("http://localhost:8100/field/" + field.id, params).then((res) => {
      console.log(res.status);
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
          <FieldTable fields={fieldsPage.content} setField={setNewField} />
          <Pagination
            currentPage={fieldsPage.pageable.pageNumber}
            totalPages={fieldsPage.totalPages}
            maxPages={maxPages}
            callback={fetchGetFieldsPage}
          />
          <input
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
          {/*
      <AddFieldForm
        ident="exampleModal"
        field={field}
        setField={setField}
        callback={fetchAddField}
      />
      <AddFieldForm
        ident="exampleModal_2"
        field={field}
        setField={setField}
        callback={fetchUpdField}
      />
      <DeleteFieldForm
        ident="exampleModal_3"
        field={field}
        setField={setField}
        callback={fetchDeleteField}
      />
          */}
          <div />
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={setDefField}
          >
            Добавить поле
          </button>
          <AddFieldForm
            ident="exampleModal"
            field={field}
            setField={setField}
            callback={fetchAddField}
          />

          <AddFieldForm
            ident="exampleModal_2"
            field={field}
            setField={setField}
            callback={fetchUpdField}
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
