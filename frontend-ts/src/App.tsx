import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {HashRouter, Link, Route, RouteComponentProps} from "react-router-dom";

interface Task {
    nom: string,
    cron: string
}


const Index = () => {

  const createTask = async () => {
    await axios.post('/api/tasks', {
      nom: "mytask"
    });
  }

  return <button onClick={createTask}>Create task</button>
};

const Tasks = ({match}: RouteComponentProps<{ id: string }>) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const getTasks = async () => {
            const fetchedTasks = await axios.get('/api/tasks');
            setTasks(fetchedTasks.data);
        };
        getTasks();
    }, []);
    return (
        <>
            <h2>This is a page for tasks with ID: {match.params.id} </h2>
            {
                tasks.map(task => <p>{task.nom} {task.cron}</p>)
            }
        </>
    )
}

function App() {

    return (
        <HashRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/tasks/1">First Task</Link>
                        </li>
                        <li>
                            <Link to="/tasks/2">Second Task</Link>
                        </li>
                    </ul>
                </nav>
                <Route path="/" exact component={Index}/>
                <Route path="/tasks/:id" component={Tasks}/>
            </div>
        </HashRouter>
    );
}

export default App;
