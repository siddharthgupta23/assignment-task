

const Employee = require('../models/Employee');
const multer = require('multer');
const path = require('path');
const express = require('express');
const app = express();

// Image upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.use('uploads', express.static('uploads')); 


const addEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    try {
        const newEmployee = new Employee({ 
            name, 
            email, 
            mobile, 
            designation, 
            gender, 
            course, 
            image: req.file ? `/uploads/${req.file.filename}` : null 
        });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Employees
const getEmployees = async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const searchQuery = search ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] } : {};

        const employees = await Employee.find(searchQuery).skip(skip).limit(limit);
        const totalEmployees = await Employee.countDocuments(searchQuery);

        // Map employees to include image URL
        const employeesWithImages = employees.map(emp => ({
            ...emp.toObject(),
            image: emp.image ? `/uploads/${emp.image.split('/').pop()}` : null  // Construct image URL
        }));

        res.json({
            employees: employeesWithImages,
            totalEmployees,
            currentPage: page,
            totalPages: Math.ceil(totalEmployees / limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        
        // Include full image URL
        employee.image = employee.image ? `/uploads/${employee.image.split('/').pop()}` : null;

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee' });
    }
};

// Update employee details
const updateEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.mobile = mobile || employee.mobile;
        employee.designation = designation || employee.designation;
        employee.gender = gender || employee.gender;
        employee.course = course || employee.course;

        if (req.file) {
            employee.image = `/uploads/${req.file.filename}`;  // Update image with new file path
        }

        await employee.save();
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee' });
    }
};

// Delete employee
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee' });
    }
};

module.exports = { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, upload };
