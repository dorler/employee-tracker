CREATE DATABASE employees;

USE employees;

CREATE TABLE employee {
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT FOREIGN KEY (manager_id) REFERENCES employee(id)
}

CREATE TABLE role {
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL FOREIGN KEY (department_id) REFERENCES department(id)
}

CREATE TABLE department {
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL
}