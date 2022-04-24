import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";
import StatListPage from "./StatListPge";
import SignIn from './SignInPage/SignIn';
import SignUp from './SignUpPage/SignUp';

function App() {
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
