class Employee {
    constructor(id,first_name = '', last_name = '', role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
    setId(id) {
        this.id = id;
        return this.id;
    }
    setFirstName(name) {
        this.first_name = name;
        return this.first_name;
    }
    setLastName(name) {
        this.last_name = name;
        return this.last_name;
    }
    setRoleId(role_id) {
        this.role_id = role_id;
        return this.role_id;
    }
    setManagerId(manager_id) {
        this.manager_id = manager_id;
        return this.manager_id;
    }
}
module.exports = Employee;