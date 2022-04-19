import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuestionsContainer = () => {
  const navigate = useNavigate();
  const [ids, setIds] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => (!isLoaded && ids ? setIsLoaded(true) : undefined), [ids]);
  useEffect(() => getIds(), []);
  const getIds = () => {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8100/register/getUsersId", params)
      .then((res) => res.json())
      .then((data) => {
        setIds(data);
      });
    //todo fetch question
  };
  return (
    <div>
      {isLoaded ? (
        <div>
          {ids.map((id) => {
            return (
              <div class="row justify-content-md-center">
                <div class="col-md-auto">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => navigate("/addAnswer/" + id)}
                  >
                    Открыть анкету пользователя {id}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default QuestionsContainer;
