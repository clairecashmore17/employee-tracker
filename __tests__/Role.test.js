const Role = require('../utils/Role');

//first test
test('creates an role object', () => {
    
    const role = new Role();

    const id = role.setId(1);
    const title = role.setTitle('Manager');
    const salary = role.setSalary(30000);
    const department_id = role.setDepartmentId(2);

    expect(title).toBe('Manager');
    
    expect(id).toEqual(1);
    expect(department_id).toEqual(2);


})