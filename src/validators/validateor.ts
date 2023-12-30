import { query } from "express-validator";

export function getJobDetails () {
    return [
        query('department').exists().withMessage("Department is required!")
    ]
}