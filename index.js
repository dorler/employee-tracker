const inquirer = require('inquirer');
const connection = require('./db/connection');
require("console.table");

const ask = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What do you want to do",
            choices: [
                "viewEmployees",
                "viewDepartments",
                "viewRole",
                "addEmployee",
                "addDepartment",
                "addRole",
                "updateEmployeeRole"
            ]
        }
    ]).then((answer) => {
        switch (answer.userChoice) {
            case "viewEmployees": 
            viewEmployees();
            break;
    
            case "viewDepartments": 
            viewDepartments();
            break;
    
            case "viewRole": 
            viewRole();
            break;
    
            case "addEmployee": 
            addEmployee();
            break;
    
            case "addDepartment": 
            addDepartment();
            break;
            
            case "addRole": 
            addRole();
            break;
    
            case "updateEmployeeRole": 
            updateEmployeeRole();
            break;
    
            default:
            connection.end();
            break;
        }
    });
}

const viewEmployees = () => {
    connection.query(`
        SELECT 
            employee.id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            department.name AS department, 
            role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM 
            employee 
                LEFT JOIN role on employee.role_id = role.id 
                LEFT JOIN department on role.department_id = department.id 
                LEFT JOIN employee manager on manager.id = employee.manager_id
    `, (err, data) => {
        if (err) throw err;
        console.table(data);
        ask();
    });
}





ask();