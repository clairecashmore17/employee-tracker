const Employee = require('../utils/Employee');

//first test
test('creates an employee object', () => {
    // const employee = new Employee('Claire', 'Cashmore', 1, 2);
    // expect(employee.first_name).toBe('Claire');
    // expect(employee.last_name).toBe('Cashmore');
    // expect(employee.role_id).toEqual(expect.any(Number));
    // expect(employee.manager_id).toEqual(expect.any(Number));
    const employee = new Employee();


    const newFirstName = employee.setFirstName('Claire');
    const newLastName = employee.setLastName('Cashmore');
    const newRoleId = employee.setRoleId(2);
    const newManagerId = employee.setManagerId(1);

    expect(newFirstName).toBe('Claire');
    expect(newLastName).toBe('Cashmore');
    expect(newRoleId).toEqual(2);
    expect(newManagerId).toEqual(1);


})