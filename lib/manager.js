class Manager {
    constructor(name, id, email, officeNumber){
        this.name = name;
        this.id = id;
        this.email = email;
        this.officeNumber = officeNumber;
        this.getName = ()=> this.name;
        this.getId = () => this.id;
        this.getEmail = () => this.email;
        this.getOfficeNumber = () => this.officeNumber;
        this.getRole = () => "Manager"
    }
};


module.exports = Manager;