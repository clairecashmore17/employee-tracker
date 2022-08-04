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

            break;
        case  'Update Employee Role':
            break;
        case 'View All Roles':
            break;
        case 'Add Role': 
            break;
        case 'View All Departments':
            break;
        case 'Quit': 
            break;
    }


}
function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, (err, result) => {
        if(err) {
            throw err;
        }
        
        console.table(result);
        return;
    });
    
}


// Invoke function
promptUser()
    .then(action => {
        return chooseAction(action);
    })
