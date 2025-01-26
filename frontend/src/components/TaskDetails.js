import { useTasksContext } from "../hooks/useTasksContext"
import { useState } from "react"
import EditModal from "../components/TaskEdit"

//date formatting fns
import { format } from 'date-fns';

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext()
    const [isModalOpen, setIsModalOpen] = useState(false)

    //handle delete
    const handleDelete = async () => {
        const response = await fetch ('/api/tasks/' + task._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    }

    //handle update
    const handleUpdate = async (updatedTask) => {
        const response = await fetch ('/api/tasks/' + task._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        const json = await response.json();

        if (response.ok) {
            console.log('Dispatching UPDATE_TASK with payload:', json);
            dispatch({ type: 'UPDATE_TASK', payload: json });
            setIsModalOpen(false); // Close the modal on success
        }
    }

    return (
        <div className="task-details">
            <h4>{task.title}</h4>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p>{format(new Date(task.createdAt), 'yyyy-MM-dd HH:mm:ss')}</p>
            <button 
                className="material-symbols-outlined" 
                onClick={() => setIsModalOpen(true)}
                style={{ backgroundColor:'#355E3B', color:'white', borderColor: '#355E3B', marginTop:'10px', marginRight: '5px', width:'40px', height:'30px', fontSize:'1.3rem', borderRadius:'4px'}}
            >
                edit
            </button>
            <button 
            className="material-symbols-outlined" 
            onClick={handleDelete}
            style={{ backgroundColor:'#FF3131', color:'white', borderColor: '#FF3131', width:'40px', height:'30px', fontSize:'1.3rem', borderRadius:'4px'}}>
                delete
            </button>


            <EditModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleUpdate} 
                task={task} 
            />
        </div>
    )
}

export default TaskDetails