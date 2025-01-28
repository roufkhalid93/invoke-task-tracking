import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, onSubmit, task }) => {
  // State for form inputs
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [status, setStatus] = useState(task ? task.status : '')

  // Update states when `workout` prop changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...task, title, description, status });
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <label>Description:</label>
          <textarea 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows="4"
            />
            <label>Status</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
            </select>
            
          <div className="button-container"> 
          <button className="modal-edit" type="submit">Save</button>
          <button className="modal-close" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;