import React, { useState, useEffect } from "react";
function AddFieldForm(props) {
  const callback = props.callback;
  const setField = props.setField;

  const copyField = (field) => {
    return {
      id: field.id,
      isActive: field.isActive,
      label: field.label,
      required: field.required,
      type: field.type,
      options: field.options,
    };
  };
  const handleLabelChange = (e) => {
    const field = copyField(props.field);
    field.label = e.target.value;
    setField(field);
  };
  const handleTypeChange = (e) => {
    const field = copyField(props.field);
    field.type = e.target.value;
    setField(field);
  };
  const handleRequiredChange = (e) => {
    const field = copyField(props.field);
    field.required = e.target.value;
    setField(field);
  };
  const handleIsActiveChange = (e) => {
    const field = copyField(props.field);
    field.isActive = e.target.value;
    setField(field);
  };
  const handleOptionsChanged = (e) => {
    const field = copyField(props.field);
    console.log(e.target.value);
    field.options = e.target.value;
    setField(field);
  };
  const handleSubmit = () => {
    callback(props.field);
  };
  return (
    <div
      class="modal fade"
      id={props.ident}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Заголовок модального окна
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Закрыть"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label for="label" class="col-form-label">
                      Label:
                    </label>
                  </div>
                  <div class="col">
                    <input
                      type="email"
                      class="form-control"
                      id="label"
                      value={props.field.label}
                      onChange={handleLabelChange}
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label for="label" class="col-form-label">
                      Type:
                    </label>
                  </div>
                  <div class="col">
                    <select
                      value={props.field.type}
                      onChange={handleTypeChange}
                      id="selectType"
                      class="form-select"
                      name="type"
                      required
                    >
                      <option>SINGLE_LINE_TEXT</option>
                      <option>MULTILINE_TEXT</option>
                      <option>RADIO_BUTTON</option>
                      <option>CHECKBOX</option>
                      <option>COMBOBOX</option>
                      <option>DATE</option>
                    </select>
                  </div>

                  {props.field.type === "CHECKBOX" ||
                  props.field.type === "COMBOBOX" ||
                  props.field.type === "RADIO_BUTTON" ? (
                    <div class="row">
                      <div class="col">
                        <label for="options" class="col-form-label">
                          Options:
                        </label>
                      </div>
                      <div class="col">
                        <textarea
                          type="text"
                          class="form-control"
                          id="label"
                          value={props.field.options}
                          onChange={handleOptionsChanged}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label for="requiredCheckbox" class="col-form-label">
                      required
                    </label>
                  </div>

                  <div class="col">
                    <input
                      checked={props.field.required}
                      onChange={handleRequiredChange}
                      type="checkbox"
                      id="requiredCheckbox"
                      class="form-check-input"
                    />
                  </div>

                  <div class="col">
                    <label for="isActiveCheckbox" class="col-form-label">
                      isActive
                    </label>
                  </div>

                  <div class="col">
                    <input
                      checked={props.field.isActive}
                      onChange={handleIsActiveChange}
                      type="checkbox"
                      id="isActiveCheckbox"
                      class="form-check-input"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={handleSubmit}
              data-bs-dismiss="modal"
            >
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddFieldForm;
