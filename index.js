const inquirer = require('inquirer');
const db = require('./db/connection'); 
const consoleTable =  require('console.table');



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
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'Add Role': 
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Quit': 
            break;
    }
   
   
}

//Function to view all current employees
function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, (err, result) => {
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



function viewAllRoles() {
    db.query(`SELECT * FROM roles`, (err, result) => {
        if(err) {
            throw err;
        }
        
        console.table(result);
        
    });
    promptUser()
    .then(action => {
        return chooseAction(action);
    })
}
function viewAllDepartments() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if(err) {
            throw err;
        }
        
        console.table(result);
        
    });
    promptUser()
    .then(action => {
        return chooseAction(action);
    })
}


// Invoke function
promptUser()
    .then(action => {
        return chooseAction(action);
    })
