import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";
import StatListPage from "./StatListPge";
import SignIn from './SignInPage/SignIn';
import SignUp from './SignUpPage/SignUp';
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Entry } from "./types";

function App() {
  const [, dispatch] = useStateValue();
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

  return (
    <div className="App">
      
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Apex Stats
          </Typography>
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
            <Route path="/" element={<StatListPage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
