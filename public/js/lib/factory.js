
class Factory {
    
    constructor() {
        this.issues = [];
        this.types = [];
        this.sprints = [];
        this.users = [];
        this.states = [];
        this.projects = [];
    }

    setIssues(issues) {
        this.parseIssues(issues);
    }

    getSprintNames() {
        let names = [];
        for (let i=0; i<this.sprints.length; i++) {
            names.push(this.sprints[i].name);
        }
        return names;
    }

    getSprintById(id) {
        id = typeof id === "string" ? parseInt(id) : id;
        for (let i=0; i<this.sprints.length; i++) {
            if (this.sprints[i].id === id) { return this.sprints[i]; }
        }
        return null;
    }
    
    parseIssues(issues) {
        for (let i=0; i<issues.length; i++) {
            this.newIssue(issues[i]);
        }
    }

    getStateName(id) {
        for (let i=0; i<this.states.length; i++) {
            if (this.states[i].id === id) { return this.states[i].name }
        }
        return null;
    }

    getAllStateNames(){
        let names = [];
        for (let i=0; i<this.states.length; i++) {
            names.push(this.states[i].name);
        }
        return names;
    }

    isStateAcronym(name) {
        for (let i=0; i<this.states.length; i++) {
            if (this.states[i].acronym === name) { return true }
        }
        return false;
    }

    getStateAcronyme(id) {
        for (let i=0; i<this.states.length; i++) {
            if (this.states[i].id === id) { return this.states[i].acronym }
        }
        return null;
    }

    getStateIdByAcronym(name) {
        for (let i=0; i<this.states.length; i++) {
            if (this.states[i].acronym === name) { return this.states[i].id }
        }
        return null;
    }

    getTypeIdByName(name) {
        name = name === null ? name : name.toLowerCase();
        for (let i=0; i<this.types.length; i++) {
            if (this.types[i].name === name) { return this.types[i].id }
        }
        return null;
    }

    getTypeNameById(id) {
        id = typeof id === "string" ? parseInt(id) : id;
        for (let i=0; i<this.types.length; i++) {
            if (this.types[i].id === id) { return this.types[i].name }
        }
        return null;
    }

    getTypeNames() {
        let names = [];
        for (let i=0; i<this.types.length; i++) {
            names.push(this.types[i].name);
        }
        return names;
    }
    
    newIssue(data) {
        data.id = data.id === undefined ? this.issues.length: data.id;
        let issue = new Issue(data);
        this.issues.push(issue);
        return issue;
    }

    getProjectAcronym(id) {
        for (let i=0; i<this.projects.length; i++) {
            if (this.projects[i].id === id) { return this.projects[i].acronym }
        }
        return null;
    }

    getProjectId(name) {
        for (let i=0; i<this.projects.length; i++) {
            if (this.projects[i].name === name) { return this.projects[i].id }
        }
        return null;
    }
    
    getProjectAcronyms() {
        let projects = [];
        for (let i=0; i<this.projects.length; i++) {
            projects.push(this.projects[i].acronym);
        }
        return projects;
    }
    
    getIssuesOfProjectAndType(projectId, type_name) {
        projectId = projectId === null ? null : parseInt(projectId);
        type_name = type_name === null ? null : type_name.toLowerCase();
        let projectIssues = [];
        for (let i=0; i<this.issues.length; i++) {
            if (projectId === null || this.issues[i].project === projectId) {
                if (type_name === null ||
                    type_name === 'all' ||
                    type_name === '' ||
                    this.issues[i].type === this.getTypeIdByName(type_name)) {
                    projectIssues.push(this.issues[i]);
                } 
            }
        }
        return projectIssues;
    }
    
    getIssue(projectId, id) {
        id = parseInt(id);
        projectId = parseInt(projectId);
        for (let i=0; i<this.issues.length; i++) {
            if (this.issues[i].project === projectId && this.issues[i].id === id) {
                return this.issues[i];
            }
        }
        return null;
    }

    getIssueByProjectId(projectId) {
        let project = Utils.getProjectFromProjectId(projectId);
        let id = Utils.getIdFromProjectId(projectId);
        return this.getIssue(this.getProjectId(project), id);
    }
    
    getUser(id) {
        for (let i=0; i<this.users.length; i++) {
            if (this.users[i].id === id) {
                return this.users[i];
            }
        }
        return null;
    }

    getUserName(id) {
        if (id === null) { return null; }
        id = parseInt(id);
        for (let i=0; i<this.users.length; i++) {
            if (this.users[i].id === id) {
                return this.users[i].first + " " + this.users[i].second;
            }
        }
        return null;
    }

    getUserByName(username) {
        username = username.split(" ");
        for (let i=0; i<this.users.length; i++) {
            if (username[0] === this.users[i].first && username[1] === this.users[i].second) {
                return this.users[i];
            }
        }
        return null;
    }
    
    issuesOfType(type_name) {
        type_name = type_name.toLowerCase();
        if (type_name === null || type_name === 'all') { return this.issues; }
        
        let typeIssues = [];
        for (let i=0; i<this.issues.length; i++) {
            if (this.issues[i].type === this.getTypeIdByName(type_name)) {
                typeIssues.push(this.issues[i]);
            }
        }
        return typeIssues;
    }
    
    issueSearch(search, issues) {
        search = search.toLowerCase();
        if (issues === null) { issues = this.issues; }
        if (search === null || search === '') { return issues; }
        
        let searchIssues = [];
        for (let i=0; i<issues.length; i++) {
            if (this.getProjectAcronym(issues[i].project).toLowerCase().includes(search)) {
                searchIssues.push(issues[i]);
            } else if (issues[i].id.toString().includes(search)) {
                searchIssues.push(issues[i]);
            } else if (issues[i].name.toLowerCase().includes(search)) {
                searchIssues.push(issues[i]);
            } else if (issues[i].type.includes(search)) {
                searchIssues.push(issues[i]);
            }
        }
        return searchIssues;
    }
}
