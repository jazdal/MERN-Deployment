import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Logout(props) {
  const {setAuthorized} = props;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/logout`, {withCredentials: true})
      .then(() => {
        setAuthorized("You have been logged out.");
        navigate("/sign_in");
      })
  }, []);
}