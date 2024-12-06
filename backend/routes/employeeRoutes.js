const express = require('express');
const router = express.Router();
const { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, upload } = require('../controllers/employeecontroller');


router.post('/', upload.single('image'), addEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);


router.put('/:id', upload.single('image'), updateEmployee);


router.delete('/:id', deleteEmployee);

module.exports = router;
