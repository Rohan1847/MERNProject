import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserHomeFeed from "./UserHomeFeed";
import Profile from "./Profile";
import { UserContext } from "../../App";
import api from "../../api";

const UserHomePage = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const [udata, setUdata] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/getdata`, { withCredentials: true });
        if (res.data.message === "Not signed in") {
          window.alert("You are not signed in!!");
          navigate("/login");
        } else {
          setUdata(res.data);
          navigate(window.location.pathname);
        }
      } catch (err) {
        console.log("not signed in");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {state.isLoggedIn ? <UserNavbar /> : ""}
      <Routes>
        <Route exact path="/" element={<UserHomeFeed data={udata} />} />
        <Route exact path="/profile" element={<Profile data={udata} />} />
      </Routes>
    </>
  );
};

export default UserHomePage;
