"use client"
import React, { useState } from "react";

const page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editingTaskIndex >= 0) {
      const updatedTask = { ...mainTask[editingTaskIndex], title, desc };
      const updatedTasks = [...mainTask];
      updatedTasks.splice(editingTaskIndex, 1, updatedTask);
      setMainTask(updatedTasks);
      setEditingTaskIndex(-1);
    } else {
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
    console.log(mainTask);
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const editHandler = (i) => {
    setTitle(mainTask[i].title);
    setDesc(mainTask[i].desc);
    setEditingTaskIndex(i);
  };

  let renderTask = <h2>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((task, index) => {
      return (
        <li key={index} className="flex items-center justify-between mb-2">
          <div className="flex justify-between w-2/3">
            <h2 className="text-2xl font-semibold">
              {editingTaskIndex === index ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                task.title
              )}
            </h2>
            <p className="text-xl font-semibold">
              {editingTaskIndex === index ? (
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              ) : (
                task.desc
              )}
            </p>
          </div>

          <div className="flex">
            {editingTaskIndex !== index && (
              <button
                onClick={() => editHandler(index)}
                className="bg-blue-400 text-white p-2 rounded text-bold mr-2"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => {
                editingTaskIndex === index
                  ? setEditingTaskIndex(-1)
                  : deleteHandler(index);
              }}
              className={`bg-${
                editingTaskIndex === index ? "green" : "red"
              }-400 text-white p-2 rounded text-bold`}
            >
              {editingTaskIndex === index ? "Cancel" : "Delete"}
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 font-bold text-center text-5xl">
        TodoList
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-5 px-4 py-4"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="text-2xl border-zinc-800 border-4 m-5 px-4 py-4"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5">
          {editingTaskIndex >= 0 ? "Update Task" : "Add Task"}
        </button>
      </form>
      <hr />
      <div className="bg-slate-200 mt-5 p-8">{renderTask}</div>
    </>
  )
}
export default page;