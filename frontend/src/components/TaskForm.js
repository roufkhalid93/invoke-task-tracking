import { useState } from "react"


const TaskForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = {title, description}

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
        }
        if (response.ok){
            setTitle('')
            setDescription('')
            setError(null)
            console.log('new workout added', json)
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
            />

            <label>Description</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm