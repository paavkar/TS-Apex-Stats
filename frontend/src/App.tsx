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
      <SignIn></SignIn>
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Apex Stats
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<StatListPage />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<StatListPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
