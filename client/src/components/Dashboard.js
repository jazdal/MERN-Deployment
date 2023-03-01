import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';

export default function Dashboard(props) {
  const {setAuthorized} = props;
  const navigate = useNavigate();
  const [allBacklogs, setAllBacklogs] = useState([]);
  const [allInProgress, setAllInProgress] = useState([]);
  const [allCompleted, setAllCompleted] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/projects/backlog`, {withCredentials: true})
      .then((res) => {
        console.log(res.data); 
        setAllBacklogs(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAuthorized("You have to be logged in to view the Project Manager Dashboard");
        navigate("/sign_in");
      })
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/projects/inprogress`, {withCredentials: true})
      .then((res) => {
        console.log(res.data);
        setAllInProgress(res.data);
      })
      .catch((err) => console.log(err))
  }, []);
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/projects/completed`, {withCredentials: true})
      .then((res) => {
        console.log(res.data);
        setAllCompleted(res.data);
      })
      .catch((err) => console.log(err))
  }, [])
  
  const changeBacklog = (e, projectId) => {
    e.preventDefault();

    const updateStatus = {
      status: "In Progress"
    }

    axios.put(`http://localhost:8000/api/projects/${projectId}`, updateStatus)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => console.log(err))
  }

  const changeInProgress = (e, projectId) => {
    e.preventDefault();

    const updateStatus = {
      status: "Completed"
    }

    axios.put(`http://localhost:8000/api/projects/${projectId}`, updateStatus)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err))
  }


  const deleteProject = (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if(confirmDelete) {
      axios.delete(`http://localhost:8000/api/projects/${projectId}`)
        .then((res) => {
          console.log("Successfully deleted from the backend.");
          setAllCompleted(allCompleted.filter(project => project._id !== projectId));
        })
        .catch((err) => console.log("Something went wrong", err))
      }
  };

  return (
    <div className="dashboard">
      <div className="top">
        <h1>Project Manager</h1>
        <Link to={"/logout"}><button id="logout-btn" className="dash-btn">Logout</button></Link>
      </div>
      <div className="main">
        <div className="stat-box">
          <h2 className="backlog">Backlog</h2>
          <div>
            {
              allBacklogs.length > 0 && allBacklogs.map((backlog, index) => (
                <div key={index} className="card">
                  <h3>{backlog.project}</h3>
                  <p>Due: {moment(backlog.dueDate).format('MM/DD/YYYY')}</p>
                  <p>{moment(backlog.dueDate).fromNow()}</p>
                  {moment().isAfter(backlog.dueDate) ? <p>Deadline has passed</p> : <p>Still have time</p>}
                  <button id="start-proj-btn" className="dash-btn" onClick={(e) => changeBacklog(e, backlog._id)}>Start Project</button>
                </div>
              ))
            }
          </div>
        </div>
        <div className="stat-box">
          <h2 className="in-progress">In Progress</h2>
          <div>
            {
              allInProgress.length > 0 && allInProgress.map((inProgress, index) => (
                <div key={index} className="card">
                  <h3>{inProgress.project}</h3>
                  <p>Due: {moment(inProgress.dueDate).format('MM/DD/YYYY')}</p>
                  <p>{moment(inProgress.dueDate).fromNow()}</p>
                  {moment().isAfter(inProgress.dueDate) ? <p>Deadline has passed</p> : <p>Still have time</p>}
                  <button id="in-prog-btn" className="dash-btn" onClick={(e) => changeInProgress(e, inProgress._id)}>Move to Completed</button>
                </div>
              ))
            }
          </div>
        </div>
        <div className="stat-box">
          <h2 className="completed">Completed</h2>
          <div>
            {
              allCompleted.length > 0 && allCompleted.map((completed, index) => (
                <div key={index} className="card">
                  <h3>{completed.project}</h3>
                  <p>Due: {moment(completed.dueDate).format('MM/DD/YYYY')}</p>
                  <p>{moment(completed.dueDate).fromNow()}</p>
                  {moment().isAfter(completed.dueDate) ? <p>Deadline has passed</p> : <p>Still have time</p>}
                  <button id="comp-btn" className="dash-btn" onClick={() => deleteProject(completed._id)}>Remove Project</button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Link to={"/projects/new"}><button id="add-proj-btn" className="dash-btn">Add New Project</button></Link>
    </div>
  );
}