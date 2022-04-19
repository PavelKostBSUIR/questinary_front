import React, { useState, useEffect } from "react";
import AnswerTable from "./answerTable";
import Pagination from "../Pagination";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function AnswerContainer(props) {
  const maxPages = 5;
  const [answerPage, setAnswerPage] = useState({});
  const [question, setQuestion] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedQuestion, setIsLoadedQuestion] = useState(false);
  const [size, setSize] = useState(5);
  const accessToken = props.accessToken;

  const connectWebSocket = () => {
    var socket = new SockJS("http://localhost:8100/websocket");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe("/answers", () => {
        fetchGetAnswerPage(0);
      });
    });
  };
  useEffect(() => {
    connectWebSocket();
  }, []);
  useEffect(() => {
    answerPage.content ? setIsLoaded(true) : setIsLoaded(false);
  }, [answerPage]);
  useEffect(() => {
    question.length > 0
      ? setIsLoadedQuestion(true)
      : setIsLoadedQuestion(false);
  }, [question]);

  useEffect(() => {
    fetchGetAnswerPage(0);
  }, [size]);
  useEffect(() => {
    fetchGetQuestion();
  }, []);
  const fetchGetAnswerPage = (page) => {
    if (size !== "") {
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      fetch(
        "http://localhost:8100/answer/get_answers?page=" +
          page +
          "&size=" +
          size,
        params
      )
        .then((res) => res.json())
        .then((data) => {
          setAnswerPage(data);
        });
    }
  };

  const fetchGetQuestion = () => {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8100/answer/question/1", params)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
      });
  };
  return (
    <div>
      {isLoaded ? (
        <div>
          {isLoadedQuestion ? (
            <div class="row">
              <div class="col">
                <AnswerTable answers={answerPage.content} question={question} />
              </div>
            </div>
          ) : (
            <div>Loading question...</div>
          )}
          <div class="row">
            <div class="col">
              <Pagination
                currentPage={answerPage.pageable.pageNumber}
                totalPages={answerPage.totalPages}
                maxPages={maxPages}
                callback={fetchGetAnswerPage}
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
        <div>Loading...</div>
      )}
    </div>
  );
}

export default AnswerContainer;
