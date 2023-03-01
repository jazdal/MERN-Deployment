import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddProject(props) {
  const {authorized} = props;
  const navigate = useNavigate();
  const [project, setProject] = useState("");
  const [projectError, setProjectError] = useState(true);
  const [dueDate, setDueDate] = useState("");
  const [dueDateError, setDueDateError] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleProjectInput = (e) => {
    setProject(e.target.value);
    e.target.value.length > 3 ? 
      setProjectError(false) :
      setProjectError(true);
  }

  const handleDueDateInput = (e) => {
    setDueDate(e.target.value);
    e.target.value.length > 1 ? 
      setDueDateError(false) : 
      setDueDateError(true);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      project, 
      dueDate, 
      status: "Backlog"
    }

    axios.post(`http://localhost:8000/api/projects`, newProject)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      })
    
    if(projectError || dueDateError) {
      window.alert("Please complete the required information first.");
    }
  }
  
  return (
    <div className="container">
      <h2 className="auth-error">{authorized}</h2>
      <div className="top-bar">
        <h1>Project Manager</h1>
        <Link to={"/"}>Back to Dashboard</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset className="add-project">
          <legend>Plan a new project</legend>
          <div>
            <p className={project.length < 3 ? null : "label-blue"}>{project.length < 3 ? "Project is required" : "Project entered"}</p>
            <label>Project</label>
            <input type="text" value={project} onChange={handleProjectInput}/>
            {
              errors.project ? <p>{errors.project.message}</p> : null
            }
          </div>
          <div>
            <p className={dueDate.length < 1 ? null : "label-blue"}>{dueDate.length < 1 ? "Due Date is required" : "Due Date entered"}</p>
            <label>Due Date</label>
            <input type="date" value={dueDate} onChange={handleDueDateInput}/>
            {
              errors.dueDate ? <p>{errors.dueDate.message}</p> : null
            }
          </div>
          <input id="add-proj-btn" type="submit" value="Plan Project" />
        </fieldset>
      </form>
    </div>
  )
}