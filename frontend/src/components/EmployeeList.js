// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EmployeeList = () => {
//     const [employees, setEmployees] = useState([]);
//     const [search, setSearch] = useState('');
//     const [page, setPage] = useState(1);
//     const [totalEmployees, setTotalEmployees] = useState(0);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {
//         fetchEmployees();
//     }, [search, page]);

//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/employees`, {
//                 params: { search, page, limit: 10 }
//             });
//             setEmployees(response.data.employees);
//             setTotalEmployees(response.data.totalEmployees);
//             setTotalPages(response.data.totalPages);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this employee?')) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/employees/${id}`);
//                 alert('Employee deleted successfully');
//                 fetchEmployees(); // Refresh the employee list
//             } catch (error) {
//                 alert('Error deleting employee');
//             }
//         }
//     };

//     const handleEdit = (id) => {
//         window.location.href = `/edit-employee/${id}`; // Navigate to edit page
//     };

//     return (
//         <div className="container">
//             <input
//                 type="text"
//                 placeholder="Search by name or email"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//             />
//             <h2>Employee List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Mobile</th>
//                         <th>Designation</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {employees.map(employee => (
//                         <tr key={employee._id}>
//                             <td>{employee.name}</td>
//                             <td>{employee.email}</td>
//                             <td>{employee.mobile}</td>
//                             <td>{employee.designation}</td>
//                             <td>
//                                 {employee.image ? (
//                                     <img src={`http://localhost:5000${employee.image}`} alt={employee.name} width="50" height="50" />
//                                 ) : (
//                                     <span>No Image</span>
//                                 )}
//                             </td>
//                             <td>
//                                 <button onClick={() => handleEdit(employee._id)}>Edit</button>
//                                 <button onClick={() => handleDelete(employee._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div>
//                 <p>Total Employees: {totalEmployees}</p>
//                 <p>Page: {page} of {totalPages}</p>
//                 <button onClick={() => setPage(prev => prev > 1 ? prev - 1 : prev)}>Previous</button>
//                 <button onClick={() => setPage(prev => prev < totalPages ? prev + 1 : prev)}>Next</button>
//             </div>
//         </div>
//     );
// };

// export default EmployeeList;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEmployees = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees`, {
                params: { search, page, limit: 10 }
            });
            setEmployees(response.data.employees);
            setTotalEmployees(response.data.totalEmployees);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error(error);
        }
    }, [search, page]); // Include search and page as dependencies

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]); // Include fetchEmployees in the dependency array

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`http://localhost:5000/api/employees/${id}`);
                alert('Employee deleted successfully');
                fetchEmployees(); // Refresh the employee list
            } catch (error) {
                alert('Error deleting employee');
            }
        }
    };

    const handleEdit = (id) => {
        window.location.href = `/edit-employee/${id}`; // Navigate to edit page
    };

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <h2>Employee List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>
                                {employee.image ? (
                                    <img src={`http://localhost:5000${employee.image}`} alt={employee.name} width="50" height="50" />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <p>Total Employees: {totalEmployees}</p>
                <p>Page: {page} of {totalPages}</p>
                <button onClick={() => setPage(prev => prev > 1 ? prev - 1 : prev)}>Previous</button>
                <button onClick={() => setPage(prev => prev < totalPages ? prev + 1 : prev)}>Next</button>
            </div>
        </div>
    );
};

export default EmployeeList;
