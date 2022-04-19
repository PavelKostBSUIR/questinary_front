import React from "react";

const AnswerTable = (props) => {
  const answers = props.answers;
  const question = props.question;
  return (
    <table class="table">
      <thead>
        <tr>
          {question.map((field) => {
            return <th scope="col">{field.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {answers.map((answer) => {
          return (
            <tr>
              {question.map((field) => {
                const fieldAnswer = answer.fieldAnswers.find(
                  (fieldAnswer) => fieldAnswer.fieldId === field.id
                );
                return (
                  <td>
                    {fieldAnswer === undefined
                      ? "N/A"
                      : fieldAnswer.options.length > 1
                      ? fieldAnswer.options.map((option) => option + ",")
                      : fieldAnswer.options}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AnswerTable;
