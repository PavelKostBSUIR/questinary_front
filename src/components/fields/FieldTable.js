import React from "react";

const FieldTable = (props) => {
  const fields = props.fields;

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Label</th>
          <th scope="col">Type</th>
          <th scope="col">Required</th>
          <th scope="col">Is active</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {fields && fields.length > 0 ? (
          fields.map((field) => {
            return (
              <tr>
                <td>{field.label}</td>
                <td>{field.type}</td>
                <td>{String(field.required)}</td>
                <td>{String(field.active)}</td>
                <td>
                  <div class="col">
                    <button
                      id={field.id}
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal_2"
                      onClick={props.setField}
                    >
                      Редактировать
                    </button>
                  </div>
                  <div class="col">
                    <button
                      id={field.id}
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal_3"
                      onClick={props.setField}
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="5">No fields</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default FieldTable;
