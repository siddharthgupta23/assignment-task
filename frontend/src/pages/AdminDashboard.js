import React from 'react';

import CreateEmployee from '../components/Employeeform';
import EmployeeList from '../components/EmployeeList';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CreateEmployee />
      <EmployeeList />
    </div>
  );
}

export default AdminDashboard;
