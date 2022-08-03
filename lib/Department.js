class Department {
    constructor(id, name = '') {
        this.id = id;
        this.name = name;
    }
    setName(name) {
        this.name = name;
        return this.name;
    }
    setId(id) {
        this.id = id;
        return this.id;
    }
}

module.exports = Department