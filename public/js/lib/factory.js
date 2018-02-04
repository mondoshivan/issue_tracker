
class Factory {
    
    constructor(data) {
        this.issues = [];
        this.types = data.types;
        this.positions = data.positions;
        this.users = data.users;
        this.states = data.states;
        this.projects = data.projects;
        
        this.parseIssues(data.issues);
    }
    
    parseIssues(data) {
        for (let i=0; i<data.length; i++) {
            this.newIssue(data[i]);
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
    
    newIssue(data) {
        data.id = data.id === undefined ? this.issues.length: data.id;
        let issue = new Issue(data);
        this.issues.push(issue);
        return issue;
    }

    getProjectName(id) {
        for (let i=0; i<this.projects.length; i++) {
            if (this.projects[i].id === id) { return this.projects[i].name }
        }
        return null;
    }

    getProjectId(name) {
        for (let i=0; i<this.projects.length; i++) {
            if (this.projects[i].name === name) { return this.projects[i].id }
        }
        return null;
    }
    
    getProjectNames() {
        let projects = [];
        for (let i=0; i<this.projects.length; i++) {
            projects.push(this.projects[i].name);
        }
        return projects;
    }
    
    getIssuesOfProjectAndType(projectId, type) {
        projectId = projectId === null ? null : parseInt(projectId);
        type = type === null ? null : type.toLowerCase();
        let projectIssues = [];
        for (let i=0; i<this.issues.length; i++) {
            if (projectId === null || this.issues[i].project === projectId) {
                if (type === null || type === 'all' || type === '' || this.issues[i].type === type) {
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
    
    issuesOfType(type) {
        type = type.toLowerCase();
        if (type === null || type === 'all') { return this.issues; }
        
        let typeIssues = [];
        for (let i=0; i<this.issues.length; i++) {
            if (this.issues[i].type === type) {
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
            if (this.getProjectName(issues[i].project).toLowerCase().includes(search)) {
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
