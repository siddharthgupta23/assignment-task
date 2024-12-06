import React, { useState } from 'react';

const Dashboard = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: ''
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to submit data
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} placeholder="Mobile" />
      <select name="designation" value={employee.designation} onChange={handleChange}>
        <option value="">Select Designation</option>
        <option value="Manager">Manager</option>
        <option value="Developer">Developer</option>
      </select>
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Dashboard;
