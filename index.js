const inquirer = require('inquirer');
const db = require('./db/connection'); 
const consoleTable =  require('console.table');
const { choices } = require('yargs');

let quit = false;


const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Departments', 'Quit']
        }
    ]);
};
const chooseAction = (action) => {
    // Extracting action from object returned by inquirer
    choice = action.action;
    console.log('You chose to do ' + choice);

    switch(choice){
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case  'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'Add Role': 
            addRole();
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Add Departments':
            addDepartment();
            break;
        case 'Quit': 
            console.log('Goodbye!');
            process.exit();
    }
   
   
}

//Function to view all current employees
function viewAllEmployees() {
    // LEFT JOIN all of the tables
    db.query(`SELECT employee.id, employee.first_name as 'First Name',employee.last_name as 'Last Name', roles.title, department.dep_name as department, manager.first_name as manager, roles.salary
    FROM employee 
    LEFT JOIN roles ON employee.role_id = roles.id
	LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager on employee.manager_id = manager.id
    ORDER BY employee.id DESC`, (err, result) => {
        if(err) {
            throw err;
        }
        
        console.table(result);
        promptUser()
        .then(action => {
            return chooseAction(action);
        })
    });
    
}

//Function to add a new employee
function addEmployee() {
    // get first and last name
    inquirer.prompt([
        {
            type: 'text',
            name: "first_name",
            message:"Employee's first name: ",
            validate: input=> {
                if(input){
                    return true;
                } else {
                    console.log('Please provide an input!');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: "last_name",
            message:"Employee's last name: ",
            validate: input=> {
                if(input){
                    return true;
                } else {
                    console.log('Please provide an input!');
                    return false;
                }
            }
        }
    ])
    // After getting names, move on to manipulate data and prompt for role
    .then(names => {
         //Set our parameters for final query
        const params = [names.first_name, names.last_name]; 
        // console.log('Here are params: ' + params)
        // Selecting our roles_id as well as the title in order to see the role titles but match to an id
        db.query(`SELECT roles.id, roles.title FROM roles`, (err, result) => {
        if(err) {
            throw err;
        }
        //Destructuring titles to pull out the id and title
        const titles = result.map(({ title, id }) => ({
            name: title,
            value: id
        }));
        //Prompt for role
        inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: 'What is Employee role?: ',
              choices: titles
            }
        ])
        // manipulate our role data as well as prompt for manager
        .then(title => {
            // adding our role to our parameter list
            params.push(title.role); 
            // Select all information from the employee table
            db.query(`SELECT * FROM employee`, (err, result) => {
                //Deconstruct the data for first name, last name, and id of chosen manager
                const managerData = result.map(({ first_name, last_name, id}) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }))
                // Prompt to choose manager from employee list
                inquirer.prompt([
                    { 
                     type: 'list',
                     name: 'manager',
                     message: 'Who is the Employee manager?',
                     choices: managerData
                    }
                 ])
                 //manipulate manager data and insert into employee table
                 .then(chosenManager => {
                        // add manager  to our paramas
                        params.push(chosenManager.manager);
                        //INSERTING our new first, last name, role id, and manager id into employee table
                        db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id)
                        VALUES(?,?,?,?)`, params, (err) => {
                            if(err) {
                                throw err;
                            }
                            console.log('Success in adding employee');
                            promptUser()
                            .then(action => {
                                return chooseAction(action);
                            })
                        })
                    })
                })
            })
        }) 
    })
}
//function to update an employee
function updateEmployeeRole(){
    db.query(`SELECT * FROM employee`, (err, result) => {
        if(err){
            throw err;
        }
        employeeData = result.map(({ first_name, last_name, id }) =>
        ({
            name: `${first_name} ${last_name}`,
            value: id
        })
        )
        // SELECT your desired employee
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?: ',
                choices: employeeData
            }
        ])
        .then(employeeChoice => {
            const params = [employeeChoice.employee];
            // SELECT your desired employee role
            db.query(`SELECT roles.id, roles.title FROM roles`, (err, result) => {
                //Destructuring titles to pull out the id and title
                const titles = result.map(({ title, id }) => ({
                    name: title,
                    value: id
                }));
                //Prompt for new role
                inquirer.prompt([
                    {
                    type: 'list',
                    name: 'role',
                    message: 'What is the new role?: ',
                    choices: titles
                    }
                ])
                .then(roleChoice => {
                    params.push(roleChoice.role);
                    //re-order the params so it fits the SQL query
                    const paramOrder = [params[1],params[0]];
                    db.query(`UPDATE employee SET role_id = ? WHERE id =?`, paramOrder,(err) => {
                        if(err){
                            throw err;
                        }
                        console.log('Success in updating employee');
                        promptUser()
                            .then(action => {
                                return chooseAction(action);
                            })
                    

                    })
                })
            })
        })
    })
}

//function to view all roles
function viewAllRoles() {
    db.query(`SELECT * FROM roles`, (err, result) => {
        if(err) {
            throw err;
        }
        
        console.table(result);
        promptUser()
        .then(action => {
            return chooseAction(action);
        })
    });
   
}

//function to add a role
function addRole() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'title',
            message: 'What is the title of this role?: ',
            validate: input=> {
                if(input){
                    return true;
                } else {
                    console.log('Please provide an input!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of this role?: ',
            validate: input=> {
                if(input){
                    return true;
                } else {
                    console.log('Please provide an input!');
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const params = [answer.title, answer.salary];
        db.query(`SELECT * FROM department`, (err, result) => {
            const departmentData = result.map(({ id, name }) => ({
                name: name,
                value: id
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department does it belong?: ',
                    choices: departmentData
                }
            ])
            .then(departmentChoice => {
                params.push(departmentChoice.department);
                db.query(`INSERT INTO roles (title, salary, department_id)
                VALUES(?,?,?)`,params, (err) => {
                    if(err){
                        throw err;
                    }
                    console.log('Successful addition of role')
                    viewAllRoles();
                    promptUser()
                            .then(action => {
                                return chooseAction(action);
                            })
                })
            })
        })
    })
}

//Function to view all departments
function viewAllDepartments() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if(err) {
            throw err;
        }
        
        console.table(result);
        promptUser()
        .then(action => {
            return chooseAction(action);
        })
    });
    
}
function addDepartment() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'department',
            message: 'What is the name of the new Department?: ',
            validate: input=> {
                if(input){
                    return true;
                } else {
                    console.log('Please provide an input!');
                    return false;
                }
            }
        }
    ])
    .then( answer => {
        const param = answer.department;

        //Create new department to table with params
        db.query(`INSERT INTO department (name)
        VALUES(?)`, param, (err)=> {
            if(err){
                throw err;
            }
            console.log('Successfully added department with new ID');
            promptUser()
            .then(action => {
                return chooseAction(action);
            })
        })
    })
}


// Invoke function
promptUser()
    .then(action => {
        
        return chooseAction(action);
    })


