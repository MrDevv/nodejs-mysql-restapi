import { Router } from 'express'
import { getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployeeById } from "../controllers/employees.controller.js";

const router = Router();

router.get('/employees', getEmployees)

router.post('/employees', createEmployees)

router.get('/employees/:id', getEmployeeById)

router.put('/employees/:id', updateEmployees)

router.delete('/employees/:id', deleteEmployees)

export default router