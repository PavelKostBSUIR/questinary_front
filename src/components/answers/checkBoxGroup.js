import React, { useState } from "react";

function CheckBoxGroup(props) {
  const checkBoxes = props.checkBoxes;
  const [currentClicked, setCurrentClicked] = useState(
    checkBoxes.map((checkBox) => {
      return { name: checkBox, checked: false };
    })
  );
  const callback = props.callback;
  const onCheckBoxClick = (e) => {
    const newArr = currentClicked.filter((element) => {
      if (e.target.name === element.name) {
        const newElement = element;
        newElement.checked = !newElement.checked;
        return newElement;
      } else {
        return element;
      }
    });
    setCurrentClicked(newArr);
    //todo can be an error
    console.log(currentClicked);
    callback(
      newArr
        .filter((element) => element.checked === true)
        .map((element) => element.name),
      props.id
    );
  };
  return currentClicked.map((checkBox, index) => {
    return (
      <div class="row">
        <div class="col">
          <label for={index} class="form-label">
            {checkBox.name}
          </label>
        </div>
        <div class="col">
          <input
            type="checkbox"
            name={checkBox.name}
            id={index}
            checked={checkBox.checked}
            onChange={onCheckBoxClick}
          />
        </div>
      </div>
    );
  });
}

export default CheckBoxGroup;
