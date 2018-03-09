

class Issue {
    
    constructor(data) {
        this.id = parseInt(data.id);
        this.parent = parseInt(data.parent);
        this.name = data.name;
        this.description = data.description === null ? '' : data.description;
        this.project = parseInt(data.project);
        this.project_id = parseInt(data.project_id);
        this.type = parseInt(data.type);
        this.user_created = parseInt(data.user_created);
        this.user_assigned = parseInt(data.user_assigned);
        this.state = parseInt(data.state);
        this.sprint = parseInt(data.sprint);
    }

    setState(state) {
        this.state = state;
    }
}

