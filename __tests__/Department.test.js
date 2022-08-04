const Department = require('../lib/Department');

//first test
test('creates an department object', () => {
    
    const department = new Department();

    const id = department.setId(1);
    const name = department.setName('Human Resources');
    

    expect(name).toBe('Human Resources');
    
    expect(id).toEqual(1);
 


})


