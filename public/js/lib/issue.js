

class Issue {
    
    constructor(data) {
        this.id = parseInt(data.project_id);
        this.parent = parseInt(data.parent);
        this.name = data.name;
        this.description = data.description === null ? '' : data.description;
        this.project = parseInt(data.project);
        this.type = parseInt(data.type);
        this.userCreated = parseInt(data.user_created);
        this.userAssigned = parseInt(data.user_assigned);
        this.state = parseInt(data.state);
        this.sprint = parseInt(data.sprint);
    }
}

