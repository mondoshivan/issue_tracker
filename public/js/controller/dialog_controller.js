

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
            let project_acronym = Utils.getDropDownSelection(document.getElementById("project"));
            let project_id = controller.factory.getProjectId(project_acronym);
            let type_name = Utils.getDropDownSelection(document.getElementById("type"));
            let type_id = controller.factory.getTypeIdByName(type_name);
            let issueName = document.getElementById("name");
            let description = document.getElementById("description");
    
            let errors = [];
            if (project_id === null)         { errors.push(document.getElementById("project")) }
            if (type_id === null)            { errors.push(document.getElementById("type")) }
            if (issueName.value === "")      { errors.push(issueName) }
            if (description.value === "")    { errors.push(description) }
    
            for (let i=0; i<errors.length; i++) {
                errors[i].classList.add("error");
            }
    
            // cancel
            if (errors.length !== 0) { return; }
    
            // insert new issue
            controller.factory.newIssue({
                "project": project_id,
                "type": type_id,
                "name": issueName.value,
                "description": description.value,
                "state": controller.factory.getStateIdByAcronym("s-td"),
                "userCreated": controller.session.userId,
                "userAssigned": controller.session.userId,
                "position": "backlog"
            });

            let form = $('#new-issue');
            form.append($("<input>").attr("type", "hidden").attr("name", "project").val(project_id));
            form.append($("<input>").attr("type", "hidden").attr("name", "type").val(type_id));
            form.submit();

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