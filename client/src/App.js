import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import {AuthProvider} from "./context/auth"
import AuthRoute from "./utils/AuthRoute";
import NoAuthRoute from "./utils/NoAuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Container>
        <MenuBar />
        <NoAuthRoute exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/signup" component={Signup} />
      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
