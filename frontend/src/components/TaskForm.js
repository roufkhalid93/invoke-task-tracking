import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"


const TaskForm = () => {
    const { dispatch } = useTasksContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState("New")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = {title, description, status}

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            setTitle('')
            setDescription('')
            setStatus("New")
            setError(null)
            setEmptyFields([])
            console.log('new task added', json)
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Task</h3>

            <label>Title</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description</label>
            <textarea 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows="4"
            />

            <label>Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={emptyFields.includes("status") ? "error" : ""}
                >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm