import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticating : false,
    isAuthenticated : localStorage.getItem("sessionToken") ? true : false,
    requestToken : null,
    sessionToken: localStorage.getItem("sessionToken"),
    userId :  localStorage.getItem("userId"),
    TmdbUsername : localStorage.getItem("username"),
    error : null
}

const LoginSlice = createSlice({
    name : "login",
    initialState,
    reducers : {

        startAuthenticating : (state) => {
            state.isAuthenticating = true;
            state.error = null;
        },

        setAuthenticated : (state) => {
            state.isAuthenticated = true;
        },
        
        setRequestToken : (state, action) => {
            state.requestToken = action.payload;
            state.isAuthenticating = false;
            
        },

        setSessionToken : (state, action) => {
            state.sessionToken = action.payload;
            state.isAuthenticating = false;
            state.isAuthenticated = true;
            localStorage.setItem("sessionToken", action.payload);
        },

        setUserId : (state, action) => {
            state.userId = action.payload;
            localStorage.setItem("userId", action.payload);
        },
        setTmdbUsername: (state, action) => {
            state.TmdbUsername = action.payload;
          },
        clearAuthentication : (state) => {
            state.isAuthenticated = false;
            state.requestToken = null;
            state.sessionToken = null;
            state.userId = null;
            state.error = null;

            localStorage.removeItem("sessionToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("accountId");
            localStorage.removeItem("username");
        },

        setError : (state, action) => {
            state.error = action.payload;
            state.isAuthenticating = false;
        },

     }
})

export const {startAuthenticating, setRequestToken, setSessionToken, setUserId, setTmdbUsername, clearAuthentication, setError} = LoginSlice.actions;

export default LoginSlice.reducer;