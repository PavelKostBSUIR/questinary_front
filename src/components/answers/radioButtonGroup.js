import React, { useState } from "react";

function RadioButtonGroup(props) {
  const radios = props.radios;
  const [currentClicked,setCurrentClicked] = useState("");
  const callback = props.callback;
  const onRadioClick = (e) => {
      setCurrentClicked(e.target.value)
    callback([e.target.value],props.id);
  };
  return radios.map((radio, index) => {
    return (
      <div class="row">
        <div class="col">
          <label for={index} class="form-label">
            {radio}
          </label>
        </div>
        <div class="col">
          <input
            type="radio"
            value={radio}
            id={index}
            checked={currentClicked === radio}
            onChange={onRadioClick}
          />
        </div>
      </div>
    );
  });
}

export default RadioButtonGroup;
