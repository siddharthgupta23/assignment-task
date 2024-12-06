// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import CreateEmployee from "./components/Employeeform";
// import EmployeeList from "./components/EmployeeList";
// import EditEmployee from "./components/editEmployeeform";
// import Signup from "./components/SignUp";
// import Login from "./components/Login";
// import Home from "./pages/Home";
// import AdminDashboard from "./pages/AdminDashboard";
// import "./scss/main.scss";

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/signup" component={Signup} />
//         <Route path="/login" component={Login} />
//         <Route path="/create-employee" component={CreateEmployee} />
//         <Route path="/employee-list" component={EmployeeList} />
//         <Route path="/edit-employee/:id" component={EditEmployee} />
//         <Route exact path="/" component={Home} />
//         <Route path="/admin" component={AdminDashboard} />
//       </Switch>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEmployee from "./components/Employeeform";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/editEmployeeform";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./components/Dashboard";
import "./scss/main.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/" element={<Home />} />
        <Route path="/task-dashboard" element={<Dashboard/>}/>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

