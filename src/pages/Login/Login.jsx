import React, { useState, } from "react";
import LoginView from "./LoginView";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  startAuthenticating,
  setRequestToken,
  setSessionToken,
  setError,
  setTmdbUsername,
  setUserId,
} from "../../store/Login/LoginSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  
  const handleLogin = async () => {
    try {
      dispatch(startAuthenticating());

  
      const tokenResponse = await axios.get(
        "https://api.themoviedb.org/3/authentication/token/new",
        {
          headers: {
            Authorization:
              `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );
      const requestToken = tokenResponse.data.request_token;
      dispatch(setRequestToken(requestToken));

     
      const loginResponse = await axios.post(
        "https://api.themoviedb.org/3/authentication/token/validate_with_login",
        {
          username,
          password,
          request_token: requestToken,
          
        },
        {
          headers: {
            Authorization:
              `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );

      if (loginResponse.data.success) {
        
        toast.success(`Login successful!`);
        const sessionResponse = await axios.post(
          "https://api.themoviedb.org/3/authentication/session/new",
          {
            request_token: requestToken,
          },
          {
            headers: {
              Authorization:
                `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }
        );
        const sessionToken = sessionResponse.data.session_id;

        
        dispatch(setSessionToken(sessionToken));
        localStorage.setItem("sessionToken", sessionToken);

        
        const accountResponse = await axios.get(
            "https://api.themoviedb.org/3/account",
            {
              headers: {
                Authorization:
                  `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
              },
              params: {
                session_id: sessionToken,
              },
            }
          );
          const accountId = accountResponse.data.id;
          const userTmdb = accountResponse.data.username;
  
          dispatch(setUserId(accountId));
          dispatch(setTmdbUsername(userTmdb));
          localStorage.setItem("userId", accountId);
          localStorage.setItem("username", userTmdb);

        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <LoginView
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        userTmdb={setTmdbUsername}
      />
    </div>
  );
};

export default Login;