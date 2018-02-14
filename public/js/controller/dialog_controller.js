

class DialogController {
    
    constructor(parentController) {
        this.parentController = parentController;

        document.getElementById("dialog").addEventListener('click', function (e) {
            e.stopPropagation();
        });
        
        document.getElementById("show-dialog").addEventListener('click', function (e) {
            controller.dialogController.show();
        });
        
        document.getElementById("modal").addEventListener('click', function (e) {
            controller.dialogController.hide();
        });
        
        $("#new-issue").find("button[type='button']").click(function() {
            let project = Utils.getDropDownSelection(document.getElementById("project"));
            let type = Utils.getDropDownSelection(document.getElementById("type"));
            let issueName = document.getElementById("name");
            let description = document.getElementById("description");
    
            let errors = [];
            if (project === "")              { errors.push(document.getElementById("project")) }
            if (type === "")                 { errors.push(document.getElementById("type")) }
            if (issueName.value === "")      { errors.push(issueName) }
            if (description.value === "")    { errors.push(description) }
    
            for (let i=0; i<errors.length; i++) {
                errors[i].classList.add("error");
            }
    
            // cancel
            if (errors.length !== 0) { return; }
    
            // insert new issue
            controller.factory.newIssue({
                "project": controller.factory.getProjectId(project),
                "type": type,
                "name": issueName.value,
                "description": description.value,
                "state": controller.factory.getStateIdByAcronym("s-td"),
                "userCreated": controller.session.userId,
                "userAssigned": controller.session.userId,
                "position": "backlog"
            });

            $("#new-issue").submit();

            controller.dialogController.hide();
            controller.refresh(null);
        });

        this.projectSelected    = this.parentController.factory.getProjectAcronyms()[0];
        this.typeSelected       = this.parentController.factory.types[0];
    }
    
    show() {
        Utils.dropDownPrepare(
            'type',
            this.parentController.factory.getTypeNames(),
            this.parentController.factory.getTypeNameById(this.typeSelected.id)
        );
        Utils.dropDownPrepare(
            'project',
            this.parentController.factory.getProjectAcronyms(),
            this.projectSelected
        );

        let overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        overlay = document.getElementById("modal");
        overlay.style.display = "block";
    }
    
    hide() {
        let overlay = document.getElementById("modal");
        overlay.style.display = "none";
        overlay = document.getElementById("overlay");
        overlay.style.display = "none";
    }
    
    
}