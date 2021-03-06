

class BoardController extends PageController {

    constructor(data) {
        super(data);

        this.search = '';
        this.issueType = 'all';
        this.projectId = null;

        this.quickFilter.push(
            new Filter(
                "Position",
                "",
                function(issue) {
                    return issue.sprint !== null;
                },
                true,
                false
            )
        );

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
        let issuesDiv = document.getElementById('issues');

        for (let i=0; i<issues.length; i++) {
            let projectName = this.factory.getProjectAcronym(issues[i].project);
            let projectNameAndId = Utils.getProjectAndIssueId(projectName, issues[i].id);

            let issueLifeCycle = document.createElement("div");
            issueLifeCycle.setAttribute("class", "issue-life-cycle "+projectNameAndId);

            let issueLifeCyclePeriods = 4;
            for (let j=1; j<=issueLifeCyclePeriods; j++) {
                let issueLifeCycleEpisode = document.createElement("div");
                let classes = "issue-life-cycle-episode " + this.factory.getStateAcronyme(j);
                issueLifeCycleEpisode.setAttribute("class", classes);

                if (issues[i].state === j) {
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
                    userImage.style.backgroundImage = "url('img/users/"+issues[i].user_assigned+".jpg')";
                    issue.appendChild(userImage);

                    // issue name
                    let issueName = document.createElement("div");
                    issueName.setAttribute("class", "issue-name");
                    issueName.setAttribute("draggable", "false");
                    issueName.appendChild(document.createTextNode(issues[i].name));
                    issue.appendChild(issueName);

                    issueLifeCycleEpisode.appendChild(issue);
                } else {
                    issueLifeCycleEpisode.appendChild(this.createEmptyIssueNode());

                }
                issueLifeCycleEpisode.setAttribute("ondrop", "controller.dropHandler(event, this);");
                issueLifeCycleEpisode.setAttribute("ondragover", "controller.dragOverHandler(event);");
                issueLifeCycle.appendChild(issueLifeCycleEpisode);
            }
            issuesDiv.appendChild(issueLifeCycle);
        }
    }

    createEmptyIssueNode() {
        let issue = document.createElement("div");
        issue.setAttribute("class", "issue empty");
        issue.innerHTML = '&nbsp;';
        return issue;
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
        let i;
        ev.preventDefault();

        // get the issue
        let projectId = ev.dataTransfer.getData("text/plain");
        let droppedElement = document.getElementById(projectId);
        let issue = this.factory.getIssueByProjectId(projectId);

        // check if the issue is dragged correctly
        if (!dropElement.parentNode.classList.contains(projectId)) { return; }

        // update the issue state
        for (i = 0; i<dropElement.classList.length; i++) {
            let className = dropElement.classList[i];
            if (this.factory.isStateAcronym(className)) {
                let newState = this.factory.getStateIdByAcronym(className);
                // check if the issue state changed
                if (issue.state === newState) { return; }
                issue.setState(newState);
                this.factory.updateIssue(issue);
                break;
            }
        }

        // replace dragged issue with empty issue node in issue container
        droppedElement.parentNode.appendChild(this.createEmptyIssueNode());

        // remove all existing child issues
        for (i = 0; i<dropElement.childNodes.length; i++) {
            dropElement.childNodes[i].remove();
        }

        // drop element
        dropElement.appendChild(droppedElement);

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


    loadRightColumn(issue) {
        super.loadRightColumn();

        if (issue === undefined) { return; }

        let columnRight = document.getElementById('column-right');
        Utils.removeAllChilds(columnRight);

        // id
        let id = document.createElement("a");
        id.setAttribute("href", "issue.html?project="+issue.project+"&id="+issue.project_id);
        id.setAttribute("class", "issue-id");
        let projectName = this.factory.getProjectAcronym(issue.project);
        let projectNameAndId = Utils.getProjectAndIssueId(projectName, issue.project_id);
        let textNodeId = document.createTextNode(projectNameAndId);
        id.appendChild(textNodeId);
        columnRight.appendChild(id);

        // name
        let issueName = document.createElement("div");
        issueName.setAttribute("class", "issue-name");
        let textNodeName = document.createTextNode(issue.name);
        issueName.appendChild(textNodeName);
        columnRight.appendChild(issueName);

        // details
        columnRight.appendChild(this.rightColumnSeparation("Details"));
        columnRight.appendChild(
            Utils.createFloatingKeyValuePair(
                "Status:",
                this.factory.getStateName(issue.state)
            )
        );
        let sprintName = '';
        if (this.factory.getSprintById(issue.sprint) !== null) {
            sprintName = this.factory.getSprintById(issue.sprint).name;
        }
        columnRight.appendChild(
            Utils.createFloatingKeyValuePair(
                "Sprint:",
                Utils.capitalize(sprintName)
            )
        );

        // people
        columnRight.appendChild(this.rightColumnSeparation("People"));
        columnRight.appendChild(
            Utils.createFloatingKeyValuePair(
                "Assignee:",
                this.factory.getUserName(issue.user_assigned)
            )
        );
        columnRight.appendChild(
            Utils.createFloatingKeyValuePair(
                "Created:",
                this.factory.getUserName(issue.user_created)
            )
        );

        // description
        columnRight.appendChild(this.rightColumnSeparation("Description"));
        let issueDescription = document.createElement("div");
        issueDescription.setAttribute("class", "issue-description");
        textNodeName = document.createTextNode(issue.description);
        issueDescription.appendChild(textNodeName);
        columnRight.appendChild(issueDescription);

        // comments
        columnRight.appendChild(this.rightColumnSeparation("Comments"));
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
                userImage.style.backgroundImage = "url('img/users/"+message.userId+".jpg')";
                comment.appendChild(userImage);

                // message
                let messageElement = document.createElement("p");
                messageElement.setAttribute("class", "message");
                messageElement.appendChild(document.createTextNode(message.message));
                comment.appendChild(messageElement);

                // assign to parent
                columnRight.appendChild(comment);
            }
        });
    }

    createIssueHeaderElement(name) {
        let element = document.createElement("div");
        element.setAttribute("class", "issue-life-cycle-episode header");
        let header = document.createElement("h3");
        header.appendChild(document.createTextNode(name));
        element.appendChild(header);
        let underscore = document.createElement("div");
        underscore.setAttribute("class", "underscore");
        element.appendChild(underscore);
        return element;
    }

    createIssuesHeader(parent) {
        let container = document.createElement("div");
        container.setAttribute("id", "header-mini");
        container.setAttribute("class", "issue-life-cycle");
        container.appendChild(this.createIssueHeaderElement("ToDo"));
        container.appendChild(this.createIssueHeaderElement("Prog."));
        container.appendChild(this.createIssueHeaderElement("Test"));
        container.appendChild(this.createIssueHeaderElement("Done"));
        parent.appendChild(container);

        container = document.createElement("div");
        container.setAttribute("id", "header-max");
        container.setAttribute("class", "issue-life-cycle");
        container.appendChild(this.createIssueHeaderElement("To Do"));
        container.appendChild(this.createIssueHeaderElement("In Progress"));
        container.appendChild(this.createIssueHeaderElement("Ready for Testing"));
        container.appendChild(this.createIssueHeaderElement("Done"));
        parent.appendChild(container);
    }

    start() {
        super.start();

        // prepare columns
        this.removeColumnLeft();
    }

    refresh(selected) {
        super.refresh(selected);

        // prepare parent
        let parent = document.getElementById('issues');
        Utils.removeAllChilds(parent);
        this.createIssuesHeader(parent);

        // get issues
        let issues = this.factory.getIssuesOfProjectAndType(this.projectId, this.issueType);
        issues = this.factory.issueSearch(this.search, issues);

        issues = this.quickFilter.filter(issues);

        // add issue elements
        this.addIssueElements(issues);

        // prepare columns
        this.loadRightColumn(selected === null ? issues[issues.length - 1] : selected);
    }

}
