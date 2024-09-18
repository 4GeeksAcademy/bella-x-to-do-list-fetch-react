import React, { useState, useEffect } from 'react';

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	const getTasks = () => {
		fetch('https://playground.4geeks.com/todo/users/bellaxgenevieve')
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(responseAsJson => {
				setTasks(responseAsJson.todos);
			})
			.catch(error => {
				console.error('Error fetching tasks:', error);
			});
	};

	const createTasks = () => {
		const data = { label: newTask, done: false };  
		fetch('https://playground.4geeks.com/todo/todos/bellaxgenevieve', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then(() => {
				getTasks();
				setNewTask("");  
			})
			.catch(error => console.error('Error creating task:', error));
	};

	const deleteTasks = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then(resp => {
				if (resp.ok) {
					getTasks();
				} else {
					console.error("Error deleting task:", resp.statusText);
				}
			})
			.catch(error => console.error('Failed to delete task:', error));
	};

	const handleDeleteTasks = () => {
		fetch('https://playground.4geeks.com/todo/users/bellaxgenevieve', {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (resp.ok) {
					setTasks([]);
					alert("All tasks have been cleared!");
				} else {
					console.error("Failed to clear all tasks:", resp.statusText);
				}
			})
			.catch(error => console.error('Failed to clear all tasks:', error));
	};

	const handleCreateUser = () => {
		fetch('https://playground.4geeks.com/todo/users/bellaxgenevieve', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			if (resp.ok) {
				console.log("User has been added to API");
			} else {
				console.error("Failed to add user:", resp.statusText);
			}
		})
		.catch(error => console.error('Error creating user:', error));
	};

	useEffect(() => {
		getTasks();
	}, []);

	const addTask = () => { 
		if (newTask.trim()) {
			createTasks();
		}
	};

	const handleEnter = (event) => {
		if (event.key === 'Enter') {
			addTask();
		}
	};

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
					{tasks.map((task) => (
						<div className='task-item d-flex justify-content-between' key={task.id}>
							<p className='task-text'>{task.label}</p> 
							<button onClick={() => deleteTasks(task.id)} className="delete-button" aria-label="Delete task">
								x
							</button>
						</div>
					))}
					<div className="d-flex justify-content-center">
						<button className="btn btn-primary" onClick={handleDeleteTasks}>I'm lazy delete everything</button>
					</div>
				</div>
				<div className='footer'>
					<p>{tasks.length} items left</p>
				</div>
			</div>
		</div>
	);
};

export default Home;

