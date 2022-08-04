const db = require('../db/connection');
class Role {
    constructor(id,title = '', salary, department_id){
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = id;
    }

    setId(id) {
        this.id = id;
        return this.id;
    } 
    setTitle(title) {
        this.title = title;
        return this.title;
    }
    setSalary(salary) {
        this.salary = salary;
        return salary;
    }
    setDepartmentId(department_id) {
        this.department_id = department_id;
        return this.department_id;
    }
    
}

module.exports = Role;