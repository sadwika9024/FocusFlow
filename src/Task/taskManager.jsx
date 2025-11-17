import React, { useEffect, useState } from "react";
import axios from 'axios';
import './taskManager.css'

function TaskManager({ setSelectedTask, autoReload }) {

    const [allTaskResponse, setAllTaskResponse] = useState([]);
    const [addNewTask, setAddNewTask] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editingTaskID, setEditingTaskId] = useState(0);

    useEffect(() => {
        fetchAllData();
    }, [autoReload]);

    // GET all tasks
    async function fetchAllData() {
        try {
            let response = await axios.get("http://localhost:8080/api/task");
            setAllTaskResponse(response.data);
        } catch (error) {
            alert("❌ Error fetching tasks. Backend might be down.");
        }
    }

    // GET completed tasks
    async function fetchCompletedData() {
        try {
            let response = await axios.get("http://localhost:8080/api/task/completed");
            setAllTaskResponse(response.data);
        } catch (error) {
            alert("❌ Error fetching completed tasks.");
        }
    }

    // GET pending tasks
    async function fetchPendingData() {
        try {
            let response = await axios.get("http://localhost:8080/api/task/pending");
            setAllTaskResponse(response.data);
        } catch (error) {
            alert("❌ Error fetching pending tasks.");
        }
    }

    // DELETE all tasks
    async function removeAllData() {
        try {
            let response = await axios.delete("http://localhost:8080/api/task/all");

            if (response.status === 200) {
                setAllTaskResponse([]);
            } else {
                alert("❗ Delete failed: " + response.data);
            }
        } catch (error) {
            alert("❌ Error deleting all tasks. Backend might be down.");
        }
    }

    // POST add new task
    async function addNewTaskWithAddButton() {
        if (!addNewTask.trim()) {
            alert("⚠️ Please enter a task.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/task", {
                title: addNewTask,
                completed: false
            });
            setAddNewTask("");
            fetchAllData();
        } catch (error) {
            alert("❌ Error while adding task.");
        }
    }

    // DELETE a task by ID
    async function deleteATaskById(id) {
        try {
            await axios.delete(`http://localhost:8080/api/task/${id}`);
            fetchAllData();
        } catch (error) {
            alert("❌ Error deleting task. Maybe it doesn't exist?");
        }
    }

    // PUT update task by ID
    async function editTastByID(id) {
        try {
            await axios.put(`http://localhost:8080/api/task/${id}`, {
                title: editTitle,
                completed: false
            });

            setEditTitle("");
            setEditingTaskId(0);
            fetchAllData();
        } catch (error) {
            alert("❌ Error updating task.");
        }
    }

    return (
        <div className="container">

            <h2 className="title">Task Manager</h2>

            {/* Input + Add */}
            <div className="add-box">
                <input
                    type="text"
                    placeholder="Add new task.."
                    value={addNewTask}
                    onChange={(e) => setAddNewTask(e.target.value)}
                />
                <button onClick={addNewTaskWithAddButton}>Add</button>
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons">
                <button onClick={fetchAllData}>All</button>
                <button onClick={fetchCompletedData}>Completed</button>
                <button onClick={fetchPendingData}>Pending</button>
            </div>

            {/* Table */}
            <table className="task-table">
                <tbody>
                    {allTaskResponse.map((eachTask) => (
                        <tr key={eachTask.id}>

                            {/* Title + Edit Mode */}
                            <td className="title-col">
                                {eachTask.id === editingTaskID ? (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="edit existing task.."
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                        <button
                                            onClick={() => {
                                                if (!editTitle.trim()) {
                                                    alert("⚠️ Please enter a value.");
                                                    return;
                                                }
                                                editTastByID(editingTaskID);
                                            }}
                                        >
                                            ✅
                                        </button>
                                    </>
                                ) : (
                                    eachTask.title
                                )}
                            </td>

                            {/* Edit Button */}
                            <td className="action-col">
                                <button
                                    disabled={eachTask.completed}
                                    onClick={() => {
                                        setEditingTaskId(eachTask.id);
                                        setEditTitle(eachTask.title);
                                    }}
                                >
                                    Edit
                                </button>
                            </td>

                            {/* Delete Button */}
                            <td className="action-col">
                                <button onClick={() => deleteATaskById(eachTask.id)}>
                                    🗑️
                                </button>
                            </td>

                            {/* Start Focus */}
                            <td>
                                <button
                                    disabled={eachTask.completed}
                                    onClick={() => setSelectedTask(eachTask)}
                                >
                                    🎯 Start Focus
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete All */}
            <div className="delete-all-box">
                <button className="delete-all" onClick={removeAllData}>
                    Delete All Tasks
                </button>
            </div>

        </div>
    );
}

export default TaskManager;
