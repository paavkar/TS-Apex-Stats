import React, { useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@mui/material";
import { Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Entry } from "./types";

import StatListPage from "./StatListPge";
import SignIn from './SignInPage/SignIn';
import SignUp from './SignUpPage/SignUp';


function App() {
  const [, dispatch] = useStateValue();
  let boolRef = useRef<boolean>(null);

let token = null
let bool: boolean = true

const setToken = (newToken: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    token = `bearer ${newToken}`
 
};

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchEntryList = async () => {
      try {
        const { data: entryListFromApi } = await axios.get<Entry[]>(
          `${apiBaseUrl}/br`
        );
        dispatch({ type: "SET_ENTRY_LIST", payload: entryListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchEntryList();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchUser = () => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch({ type: "SET_USER", payload: user});
        console.log(user);
        setToken(user.token);
        bool = false;
        console.log(bool);
        return;
      };
      bool = true;
      console.log(bool);
    };
    void fetchUser();
  }, [dispatch]);


  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    window.location.reload();
  }

  return (
    <div className="App">
      
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Apex Stats
          </Typography>
          {bool ? 
          <div>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Button component={Link} to="/login" variant="contained" color="primary" style={{ marginLeft: "0.5em" }}>
            Sign in
          </Button>
          <Button component={Link} to="/register" variant="contained" color="primary" style={{ marginLeft: "0.5em" }}>
            Sign up
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
          </div>
             :
          <div>
            <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
             is logged in
          </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
            Home
            </Button>
            <Button onClick={() => logout()} variant="contained" color="primary" style={{ marginLeft: "0.5em" }} >
            Logout
            </Button>
            <Routes>
              <Route path="/" element={<StatListPage />} />
            </Routes>
          </div>
          }
          
        </Container>
      </Router>
    </div>
  );
}

export default App;
