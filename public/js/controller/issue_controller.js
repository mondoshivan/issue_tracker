

class IssueController extends PageController {
    
    constructor(data) {
        let i;
        super(data);
        
        this.issue = this.factory.getIssue(
            Utils.getUrlParameterByName("project", window.location.href),
            Utils.getUrlParameterByName("id", window.location.href)
        );
        
        let commitable = document.getElementsByClassName("commitable");
        for (i = 0; i<commitable.length; i++) {
            commitable[i].addEventListener('change', function (e) {
                let id = e.target.id.replace("-input", "");
                let node = document.getElementById(id);
                node.innerHTML = e.target.value === "" ? e.originalTarget.value : e.target.value;
                e.target.style.display = "none";
                node.style.display = "inline-block";
            });

            commitable[i].addEventListener('blur', function (e) {
                let id = e.target.id.replace("-input", "");
                let node = document.getElementById(id);
                e.target.style.display = "none";
                node.style.display = "inline-block";
            });
        }
        
        let changeable = document.getElementsByClassName("changeable");
        for (i = 0; i<changeable.length; i++) {
            changeable[i].addEventListener('click', function (e) {
                e.target.style.display = "none";
                let input = document.getElementById(e.target.id + '-input');
                input.style.display = "inline-block";
                input.focus();
            });
        }

        document.getElementById('issue-name-input').addEventListener('change', function (e) {
            controller.issue.name = e.target.value;
            // let form = e.target.parentNode;
            // form.submit();
        });

        document.getElementById('issue-status').addEventListener('change', function (e) {
            controller.issue.name = e.target.value;
            // let form = e.target.parentNode;
            // form.submit();
        });

        document.getElementById('issue-description').addEventListener('change', function (e) {
            controller.issue.description = e.target.value;
            // let form = e.target.parentNode;
            // form.submit();
        });

        document.getElementById('user-assigned-input').addEventListener('change', function (e) {
            let inputElement = document.getElementById('user-assigned-input');
            let datalistOptions = document.getElementById('user-assigned-options');
            let exists = Utils.existsInDataset(datalistOptions.childNodes, e.target.value);
            if (exists) {
                let user = controller.factory.getUserByName(e.target.value);
                controller.issue.userAssigned = user.id;
                let userString = controller.factory.getUserName(user.id);
                document.getElementById('user-assigned').innerHTML = userString;
                inputElement.setAttribute("value", userString);
                // let form = inputElement.parentNode;
                // form.submit();
            } else {
                let user = controller.factory.getUserName(controller.issue.userAssigned);
                document.getElementById('user-assigned').innerHTML = user;
                inputElement.setAttribute("value", user);
            }
        });

        document.getElementById('user-created-input').addEventListener('change', function (e) {
            let inputElement = document.getElementById('user-created-input');
            let datalistOptions = document.getElementById('user-created-options');
            let exists = Utils.existsInDataset(datalistOptions.childNodes, e.target.value);
            if (exists) {
                let user = controller.factory.getUserByName(e.target.value);
                controller.issue.userCreated = user.id;
                let userString = controller.factory.getUserName(user.id);
                document.getElementById('user-created').innerHTML = userString;
                inputElement.setAttribute("value", userString);
                // let form = inputElement.parentNode;
                // form.submit();
            } else {
                let user = controller.factory.getUserName(controller.issue.userCreated);
                document.getElementById('user-created').innerHTML = user;
                inputElement.setAttribute("value", user);
            }
        });
    }
    
    
    ///////////////
    // inherited //
    ///////////////

    start() {
        super.start();

        this.removeColumnLeft();
        this.removeColumnRight();

        let projectName = this.factory.getProjectAcronym(this.issue.project);
        let projectNameAndId = Utils.getProjectAndIssueId(projectName, this.issue.project_id);
        
        // id     
        let issueId = document.getElementById('issue-id');
        issueId.setAttribute("href", "issue.html?project="+this.issue.project+"&id="+this.issue.project_id);
        let textnode = document.createTextNode(projectNameAndId);
        issueId.appendChild(textnode);
        
        // name
        let issueName = document.getElementById('issue-name');
        textnode = document.createTextNode(this.issue.name);
        issueName.appendChild(textnode);
        let issueNameInput = document.getElementById('issue-name-input');
        issueNameInput.setAttribute("value", this.issue.name);

        // status
        Utils.dropDownPrepare(
            'issue-status',
            this.factory.getAllStateNames(),
            this.factory.getStateName(this.issue.state)
        );

        // position
        Utils.dropDownPrepare(
            'issue-position',
            this.factory.getSprintNames(),
            Utils.capitalize(this.issue.sprint.name)
        );

        // description
        let issueDescription = document.getElementById('issue-description');
        textnode = document.createTextNode(this.issue.description);
        issueDescription.appendChild(textnode);
        
        // created
        let user = this.factory.getUser(this.issue.userCreated);
        let userCreated = document.getElementById('user-created');
        userCreated.appendChild(document.createTextNode(user.first + " " + user.second));
        let userCreatedInput = document.getElementById('user-created-input');
        userCreatedInput.setAttribute("value", user.first + " " + user.second);
        
        // assigned
        user = this.factory.getUser(this.issue.userAssigned);
        let userAssigned = document.getElementById('user-assigned');
        userAssigned.appendChild(document.createTextNode(user.first + " " + user.second));
        let userAssignedInput = document.getElementById('user-assigned-input');
        userAssignedInput.setAttribute("value", user.first + " " + user.second);

        // comments
        let issueComments = document.getElementById('issue-comments');
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
                issueComments.appendChild(comment);
            }

            // new comment
            let newComment = document.createElement("div");
            newComment.setAttribute("class", "new-comment");
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "#");
            let textarea = document.createElement("textarea");
            textarea.setAttribute("name", "message");
            textarea.setAttribute("placeholder", "write a comment ...");
            form.appendChild(textarea);
            let sendButton = document.createElement("button");
            sendButton.setAttribute("class", "button");
            sendButton.setAttribute("type", "button");
            sendButton.appendChild(document.createTextNode("submit"));
            form.appendChild(sendButton);

            newComment.appendChild(form);
            issueComments.appendChild(newComment);

        });

        // assigned autocomplete
        let userAssignedOptions = document.getElementById('user-assigned-options');
        let userCreatedOptions = document.getElementById('user-created-options');
        for (let i=0; i<this.factory.users.length; i++) {
            user = this.factory.users[i];
            let assignedOption = document.createElement("option");
            let createdOption = document.createElement("option");
            assignedOption.setAttribute("value", user.first + " " + user.second);
            createdOption.setAttribute("value", user.first + " " + user.second);
            userAssignedOptions.appendChild(assignedOption);
            userCreatedOptions.appendChild(createdOption);
        }
    }
    
    refresh(selected) {
        super.refresh(null);
    }
    
}
