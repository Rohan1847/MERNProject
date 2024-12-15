import React, {useEffect, useContext} from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () =>{
    const base_uri = process.env.REACT_APP_BASE_URI;
    const navigate = useNavigate();
    const {dispatch} = useContext(UserContext);

    useEffect(()=>{
        dispatch({type:'user', value:{isLoggedIn:false}});
        async function deleteData(){
            const res = await axios.get(`${base_uri}/logout`,{withCredentials:true});
            console.log(res);
            window.localStorage.removeItem('isLoggedIn');
            navigate('/login');
        }
        deleteData();
    }, []);
        
    
    return(
        <>
            <h1>Logout processing!!!!</h1>
        </>
    )
}

export default Logout;