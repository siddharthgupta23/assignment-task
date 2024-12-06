// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditEmployee = ({ match }) => {
//     const [employee, setEmployee] = useState({});
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [mobile, setMobile] = useState('');
//     const [designation, setDesignation] = useState('');
//     const [gender, setGender] = useState('');
//     const [course, setCourse] = useState('');
//     const [image, setImage] = useState(null);

//     useEffect(() => {
//         const fetchEmployee = async () => {
//             const { data } = await axios.get(`http://localhost:5000/api/employees/${match.params.id}`);
//             setEmployee(data);
//             setName(data.name);
//             setEmail(data.email);
//             setMobile(data.mobile);
//             setDesignation(data.designation);
//             setGender(data.gender);
//             setCourse(data.course);
//         };
//         fetchEmployee();
//     }, [match.params.id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('email', email);
//         formData.append('mobile', mobile);
//         formData.append('designation', designation);
//         formData.append('gender', gender);
//         formData.append('course', course);
//         if (image) formData.append('image', image);

//         try {
//             await axios.put(`http://localhost:5000/api/employees/${match.params.id}`, formData);
//             alert('Employee updated successfully');
//             window.location.href = '/employee-list'; // Redirect after updating
//         } catch (error) {
//             alert('Error updating employee');
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Edit Employee</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Mobile"
//                     value={mobile}
//                     onChange={(e) => setMobile(e.target.value)}
//                     required
//                 />
//                 <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
//                     <option value="">Select Designation</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Developer">Developer</option>
//                     <option value="Tester">Tester</option>
//                 </select>
//                 <div>
//                     <input
//                         type="radio"
//                         name="gender"
//                         value="Male"
//                         checked={gender === 'Male'}
//                         onChange={(e) => setGender(e.target.value)}
//                     />
//                     Male
//                     <input
//                         type="radio"
//                         name="gender"
//                         value="Female"
//                         checked={gender === 'Female'}
//                         onChange={(e) => setGender(e.target.value)}
//                     />
//                     Female
//                 </div>
//                 <input
//                     type="text"
//                     placeholder="Course"
//                     value={course}
//                     onChange={(e) => setCourse(e.target.value)}
//                     required
//                 />
//                 <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/jpeg, image/png" />
//                 <button type="submit">Update</button>
//             </form>
//         </div>
//     );
// };

// export default EditEmployee;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate for navigation in v6

const EditEmployee = () => {
    const { id } = useParams();  // This will get the `id` from the URL
    const navigate = useNavigate(); // For redirection after successful update

    const [employee, setEmployee] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/employees/${id}`);
                setEmployee(data);
                setName(data.name);
                setEmail(data.email);
                setMobile(data.mobile);
                setDesignation(data.designation);
                setGender(data.gender);
                setCourse(data.course);
                setImage(data.image)
            } catch (error) {
                console.error('Error fetching employee data:', error);
                alert('Failed to fetch employee data');
            }
        };
        fetchEmployee();
    }, [id]); // Re-run effect when `id` changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', course);
       formData.append('image', image);

        try {
            await axios.put(`http://localhost:5000/api/employees/${id}`, formData);
            alert('Employee updated successfully');
            navigate('/employee-list'); // Redirect after updating
        } catch (error) {
            alert('Error updating employee');
        }
    };

    return (
        <div className="container">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                />
                <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Tester">Tester</option>
                </select>
                <div>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender === 'Male'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                </div>
                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/jpeg, image/png" />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditEmployee;

