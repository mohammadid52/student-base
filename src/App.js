import React from "react";
import "./Styles/App.scss";
import Navbar from "./Components/Layout/Navbar";
import Students from "./Components/Students/Students";
import Student from "./Components/Students/Student";
import StudentForm from "./Components/Students/StudentForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Pages/login";
import PrivateRoute from "./routes/privateRoute";

const App = () => {
  return (
    <Router>
      <div>
        <PrivateRoute component={Navbar} />
        <Switch>
          <Route exact path="/" component={Students} />
          <Route path="/student/:id" component={Student} />
          <Route path="/studentForm/:id?" component={StudentForm} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
