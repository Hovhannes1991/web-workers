import "./style.css";
const result = document.querySelector("#result");
const get_result_btn = document.querySelector("#get_result_btn");
const sync_log_btn = document.querySelector("#sync_log_btn");
const durations_list = document.querySelector("#durations_list");

let function_execution_durations = [];

const getResult = () => {
  // get_result_btn.disabled = true;
  result.textContent = "Loading...";

  const worker_1 = new Worker("./webworkers/bad-function.js");
  worker_1.onmessage = (message) => {
    const { num, duration } = message.data;
    result.textContent = num;
    get_result_btn.disabled = false;
    worker_1.terminate();

    function_execution_durations.push(duration);
    updateFunctionExecutionDurationsList();
  };

  worker_1.postMessage(Math.ceil(Math.random() * 100));
};

get_result_btn.addEventListener("click", getResult);

sync_log_btn.addEventListener("click", () => {
  console.log("log");
  console.log("---");
});

const updateFunctionExecutionDurationsList = () => {
  const last_added_item_id = function_execution_durations.length;
  const last_added_item_index = last_added_item_id - 1;
  const duration = function_execution_durations[last_added_item_index];
  const li = document.createElement("li");
  li.textContent = last_added_item_id + ": " + duration;
  durations_list.appendChild(li);
};
