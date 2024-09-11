import React, { useState } from 'react';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    
    function addTask() {
        if (newTask.trim() !== "") {
            let newTasks = [...tasks, newTask];
            setTasks(newTasks);
            setNewTask("");
        }
    }

    function handleEnter(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    function deleteTask(taskIndex) {
        const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
        setTasks(updatedTasks);
    }

    return (
        <div className='title'>
            <h1>To-Do List</h1>
            <div className='container w-50 max-height shade text-center'>
                <div>
                    <input 
                        onChange={(e) => setNewTask(e.target.value)} 
                        onKeyDown={handleEnter} 
                        value={newTask} 
                        type="text" 
                        placeholder="What's next?" 
                    />
                    {tasks.map((task, index) => (
                        <div className='d-flex justify-content-between' key={index}>
                            <p className='task-text'>{task}</p>
                            <button 
                                onClick={() => deleteTask(index)} 
                                className="delete-button">
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;



