import { response } from "express";
import { pool } from "../db.js";

export const getEmployees = async(req, res = response)=> {
    try {
        const [data] =  await pool.query('SELECT * FROM employee')
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: 'Error in server'
        })
    }
}

export const getEmployeeById = async (req, res = response) => {
    try {
        const {id} = req.params;
        const [data] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
    if (data.length <= 0) {
        return res.status(404).json({
            message: 'Employee not found'
        })
    }
    res.json(data[0])    
    } catch (error) {
        return res.status(500).json({
            message: 'Error in server'
        })
    }
}

export const createEmployees = async(req, res = response)=> {
    try {
        const {name, salary} = req.body;
        const [rows] = await pool.query('INSERT INTO employee(name, salary) VALUES(?, ?)', [name, salary])
        res.json({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error in server'
        })
    }
}

export const updateEmployees = async(req, res= response)=> {
    const {id} = req.params
    const {name, salary} = req.body
    const [result] = await pool.query('UPDATE employee SET name = ?, salary = ? WHERE id = ?', [name, salary, id])
    console.log(result.affectedRows);
    if (result.affectedRows<=0) return res.status(404).json({
        message: 'employee not found'
    })

    const [employee] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])

    res.json(employee[0])
}

export const deleteEmployees = async(req, res= response)=> {
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])

    if (result.affectedRows<=0) return res.status(404).json({
        message: 'employee not found'
    })
    // res.sendStatus(204)
    res.json({
        message: 'employee deleted'
    })
}