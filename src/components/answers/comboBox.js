import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";

function RadioButtonGroup(props) {
  const combos = props.combos;
  const [currentClicked, setCurrentClicked] = useState("");
  const callback = props.callback;
  const handleTypeChange = (e) => {
    setCurrentClicked(e.target.value);
    callback([e.target.value], props.id);
  };
  return (
    <div class="col">
      <select
        value={currentClicked}
        onChange={handleTypeChange}
        id="selectType"
        class="form-select"
        name="type"
      >
        {combos.map((combo) => {
          return <option>{combo}</option>;
        })}
      </select>
    </div>
  );
}

export default RadioButtonGroup;
