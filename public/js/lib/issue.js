

class Issue {
    
    constructor(data) {
        this.id = parseInt(data.id);
        this.parent = parseInt(data.parent);
        this.name = data.name;
        this.description = data.description;
        this.project = parseInt(data.project);
        this.type = data.type.toLowerCase();
        this.userCreated = parseInt(data.userCreated);
        this.userAssigned = parseInt(data.userAssigned);
        this.state = parseInt(data.state);
        this.position = data.position.toLowerCase();
    }
}

