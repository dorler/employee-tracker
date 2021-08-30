const inquirer = require("inquirer");
const connection = require("./db/connection");
require("console.table");

const ask = () => {
  inquirer
    .prompt([
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
          "updateEmployeeRole",
        ],
      },
    ])
    .then((answer) => {
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
};

const viewEmployees = () => {
  connection.query(
    `
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
    `,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      ask();
    }
  );
};

const viewDepartments = () => {
  connection.query(
    `
        SELECT * FROM departments
    `,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      ask();
    }
  );
};

const viewRole = () => {
  connection.query(
    `
        SELECT * FROM role
    `,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      ask();
    }
  );
};

const addEmployee = async () => {
  const employee = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "last name?",
    },
    {
      type: "input",
      name: "role_id",
      message: "role id?",
    },
    {
      type: "input",
      name: "manager_id",
      message: "manager id?",
    },
  ]);
  connection.query(`INSERT INTO employee SET ?`, employee);
  ask();
};

const addRole = async () => {
  const role = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Role Title?",
    },
    {
      type: "input",
      name: "salary",
      message: "Role Salary?",
    },
    {
      type: "input",
      name: "department_id",
      message: "Department id?",
    },
  ]);
  connection.query(`INSERT INTO role SET ?`, role);
  ask();
};

const addDepartment = async () => {
  const department = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Department name?",
    },
  ]);
  connection.query(`INSERT INTO department SET ?`, department);
  ask();
};

const updateEmployeeRole = async () => {
  const data = await inquirer.prompt([
    {
      type: "input",
      name: "roleId",
      message: "Role id?",
    },
    {
      type: "input",
      name: "employeeId",
      message: "Employee Id?",
    },
  ]);
  connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [
    data.roleId,
    data.employeeId,
  ]);
  ask();
};

ask();
