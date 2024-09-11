import React, { useState } from 'react';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    
    // Using the arrow function syntax for consistency
    const addTask = () => {
        if (newTask.trim() !== "") {
            const newTasks = [...tasks, newTask];
            setTasks(newTasks);
            setNewTask("");
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    const deleteTask = (taskIndex) => {
        const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
        setTasks(updatedTasks);
    }

    return (
        <div className='title'>
            <h1>To-Do List ☺</h1>
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
                        <div className='task-item d-flex justify-content-between' key={index}>
                            <p className='task-text'>{task}</p>
                            <button onClick={() => deleteTask(index)} className="delete-button">
                                x
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;




