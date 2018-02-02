

class BacklogController extends PageController {
    
    constructor(data) {
        super(data);
        
        this.search = '';
        this.issueType = 'all';
        this.projectId = null;
        
        let radioButtons = document.getElementsByClassName("radio-button");
        for (let i=0; i<radioButtons.length; i++) {
            radioButtons[i].addEventListener('click', function (e) {
                let selected = e.target;
                Utils.selectRadioButton(radioButtons, selected);
                controller.issueType = selected.innerHTML.toLowerCase();
                controller.refresh(null);
            });
        }
        
        document.getElementById("search").addEventListener('change', function (e) {
            controller.search = e.target.value;
            document.activeElement.blur();
            controller.refresh(null);
        });
    }
    
    addIssueElements(issues) {
        if (issues === null || issues.length === 0) { return; }

        let sprintDiv = document.getElementById('sprint');
        sprintDiv.setAttribute("ondrop", "controller.dropHandler(event, this);");
        sprintDiv.setAttribute("ondragover", "controller.dragOverHandler(event);");

        let backlogDiv = document.getElementById('backlog');
        backlogDiv.setAttribute("ondrop", "controller.dropHandler(event, this);");
        backlogDiv.setAttribute("ondragover", "controller.dragOverHandler(event);");

        let h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode("Sprint"));
        sprintDiv.appendChild(h3);

        h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode("Backlog"));
        backlogDiv.appendChild(h3);
    
        for (let i=0; i<issues.length; i++) {
            let projectName = this.factory.getProjectName(issues[i].project);
            let projectNameAndId = Utils.getProjectNameAndId(projectName, issues[i].id);

            // issue
            let issue = document.createElement("div");
            issue.setAttribute("id", projectNameAndId);
            issue.setAttribute("class", "issue");
            issue.setAttribute("onclick", "controller.issueSelected(this, '"+issues[i].project+"', "+issues[i].id+");");
            issue.setAttribute("draggable", "true");
            issue.setAttribute("ondragstart", "controller.dragStartHandler(event, this);");
            issue.setAttribute("ondragend", "controller.onDragEnd(this)");

            // type identifier
            let typeIdentifier = document.createElement("div");
            typeIdentifier.setAttribute("class", "type-id " + issues[i].type);
            issue.appendChild(typeIdentifier);

            // project id
            let id = document.createElement("a");
            id.setAttribute("href", "issue.html?project="+issues[i].project+"&id="+issues[i].id);
            id.setAttribute("class", "issue-id");
            id.setAttribute("draggable", "false");
            id.appendChild(document.createTextNode(projectNameAndId));
            issue.appendChild(id);

            // assigned user image
            let userImage = document.createElement("div");
            userImage.setAttribute("class", "avatar");
            userImage.style.backgroundImage = "url('/ea3/img/users/"+issues[i].userAssigned+".jpg')";
            issue.appendChild(userImage);

            // issue name
            let issueName = document.createElement("span");
            issueName.setAttribute("class", "issue-name");
            issueName.setAttribute("draggable", "false");
            issueName.appendChild(document.createTextNode(issues[i].name));
            issue.appendChild(issueName);

            if (issues[i].position === 'sprint') {
                sprintDiv.appendChild(issue);
            } else {
                backlogDiv.appendChild(issue);
            }
        }
    }

    // Drag & Drop:
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
    dragStartHandler(ev, dragElement) {
        // hide the dragged element
        window.requestAnimationFrame(function() { dragElement.style.visibility = "hidden"; });

        // Add the target element's id to the data transfer object
        ev.dataTransfer.setData("text/plain", dragElement.id);
    }

    dragOverHandler(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move"
    }

    onDragEnd(draggedElement) {
        // show dragged element after drop
        window.requestAnimationFrame(function() { draggedElement.style.visibility = ""; });
    }

    dropHandler(ev, dropElement) {
        ev.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        let data = ev.dataTransfer.getData("text/plain");
        let issue = this.factory.getIssueByProjectId(data);
        let droppedElement = document.getElementById(data);
        if (dropElement.id === 'sprint') {
            issue.position = 'sprint';
        } else {
            issue.position = 'backlog';
        }
        dropElement.appendChild(droppedElement);
        this.refresh(issue);
    }

    dropHandlerProject(ev, dropElement) {
        ev.preventDefault();

        let project = this.factory.getProjectId(dropElement.id);
        if (project === null) { return; }

        let data = ev.dataTransfer.getData("text/plain");
        let droppedElement = document.getElementById(data);
        let issue = this.factory.getIssueByProjectId(droppedElement.id);
        issue.project = project;
        issue.id = this.factory.getIssuesOfProjectAndType(project, null).length;
        this.refresh(issue);
    }

    issueSelected(element, project, id) {
        Utils.removeSelected(document.getElementsByClassName("issue"));
        element.classList.add("selected");
        this.loadRightColumn(this.factory.getIssue(project, id));
    }

    projectSelected(element, projectId) {
        Utils.removeSelected(document.getElementsByClassName("backlog-project"));
        element.classList.add("selected");
        this.projectId = projectId;
        this.refresh(null);
    }
    
    
    ///////////////
    // inherited //
    ///////////////
    
    loadLeftColumn(projects) {
        super.loadLeftColumn();

        // root element
        let projectsElement = document.getElementById('projects');
        Utils.removeAllChilds(projectsElement);

        // show all projects
        let projectElement = document.createElement("div");
        projectElement.setAttribute("class", "backlog-project");
        projectElement.setAttribute("onclick", "controller.projectSelected(this, null)");
        let projectName = document.createElement("h2");
        projectName.appendChild(document.createTextNode("All Projects"));
        projectElement.appendChild(projectName);
        projectsElement.appendChild(projectElement);

        // show individual projects
        for (let i=0; i<projects.length; i++) {
            let bugs = this.factory.getIssuesOfProjectAndType(projects[i].id, "Bug").length;
            let tasks = this.factory.getIssuesOfProjectAndType(projects[i].id, "Task").length;

            projectElement = document.createElement("div");
            projectElement.setAttribute("class", "backlog-project");
            projectElement.setAttribute("id", projects[i].name);
            projectElement.setAttribute("onclick", "controller.projectSelected(this, '"+projects[i].id+"')");
            projectElement.setAttribute("ondrop", "controller.dropHandlerProject(event, this);");
            projectElement.setAttribute("ondragover", "controller.dragOverHandler(event);");

            projectName = document.createElement("h2");
            projectName.appendChild(document.createTextNode(projects[i].name));
            projectElement.appendChild(projectName);

            projectElement.appendChild(
                Utils.createFloatingKeyValuePair(
                    "Bugs:",
                    bugs
                )
            );

            projectElement.appendChild(
                Utils.createFloatingKeyValuePair(
                    "Tasks:",
                    tasks
                )
            );

            projectsElement.appendChild(projectElement);
        }
    }
    
    loadRightColumn(issue) {
        super.loadRightColumn();

        if (issue === undefined) { return; }
           
        let issueDetails = document.getElementById('issue-details');
        Utils.removeAllChilds(document.getElementById('issue-details'));
        
        // id
        let id = document.createElement("a");
        id.setAttribute("href", "issue.html?project="+issue.project+"&id="+issue.id);
        id.setAttribute("class", "issue-id");
        let projectName = this.factory.getProjectName(issue.project);
        let projectNameAndId = Utils.getProjectNameAndId(projectName, issue.id);
        let textNodeId = document.createTextNode(projectNameAndId);
        id.appendChild(textNodeId);
        issueDetails.appendChild(id);
    
        // name
        let issueName = document.createElement("div");
        issueName.setAttribute("class", "issue-name");
        let textNodeName = document.createTextNode(issue.name);
        issueName.appendChild(textNodeName);
        issueDetails.appendChild(issueName);

        // details
        issueDetails.appendChild(this.rightColumnSeparation("Details"));
        issueDetails.appendChild(
            Utils.createFloatingKeyValuePair(
                "Status:",
                this.factory.getStateName(issue.state)
            )
        );
        issueDetails.appendChild(
            Utils.createFloatingKeyValuePair(
                "Position:",
                Utils.capitalize(issue.position)
            )
        );

        // people
        issueDetails.appendChild(this.rightColumnSeparation("People"));
        issueDetails.appendChild(
            Utils.createFloatingKeyValuePair(
                "Assignee:",
                this.factory.getUserName(issue.userAssigned)
            )
        );
        issueDetails.appendChild(
            Utils.createFloatingKeyValuePair(
                "Created:",
                this.factory.getUserName(issue.userCreated)
            )
        );

        // description
        issueDetails.appendChild(this.rightColumnSeparation("Description"));
        let issueDescription = document.createElement("div");
        issueDescription.setAttribute("class", "issue-description");
        textNodeName = document.createTextNode(issue.description);
        issueDescription.appendChild(textNodeName);
        issueDetails.appendChild(issueDescription);

        // comments
        issueDetails.appendChild(this.rightColumnSeparation("Comments"));
        getComment(projectNameAndId, function(data) {
            let comments = data.getElementsByTagName("comment");
            for (let i=0; i<comments.length; i++) {
                let message = new Message(comments[i]);

                // create comment
                let comment = document.createElement("div");
                comment.setAttribute("class", "comment");

                // date
                let dateElement = document.createElement("h4");
                dateElement.setAttribute("class", "date");
                dateElement.appendChild(document.createTextNode(message.getFormatedDate()));
                comment.appendChild(dateElement);

                // user name
                let userName = document.createElement("h5");
                userName.setAttribute("class", "name");
                userName.appendChild(document.createTextNode(controller.factory.getUserName(message.userId)));
                comment.appendChild(userName);

                // user image
                let userImage = document.createElement("div");
                userImage.setAttribute("class", "avatar");
                userImage.style.backgroundImage = "url('/ea3/img/users/"+message.userId+".jpg')";
                comment.appendChild(userImage);

                // message
                let messageElement = document.createElement("p");
                messageElement.setAttribute("class", "message");
                messageElement.appendChild(document.createTextNode(message.message));
                comment.appendChild(messageElement);

                // assign to parent
                issueDetails.appendChild(comment);
            }
        });
    }

    start() {
        super.start();

        this.refresh(null);
    }
    
    refresh(selected) {
        super.refresh(null);

        // prepare
        Utils.removeAllChilds(document.getElementById('sprint'));
        Utils.removeAllChilds(document.getElementById('backlog'));

        // filter
        let issues = this.factory.getIssuesOfProjectAndType(this.projectId, this.issueType);
        issues = this.factory.issueSearch(this.search, issues);
        issues = this.quickFilter.filter(issues);

        // add issue elements
        this.addIssueElements(issues);

        // load columns
        this.loadLeftColumn(this.factory.projects);
        this.loadRightColumn(selected === null ? issues[issues.length - 1] : selected);
    }
    
}
