

class NewIssueDialogController extends DialogController {

    constructor(view, parentController) {
        super(view, parentController);
        this.addViews();
        this.setHeader("New Issue");
        this.eventHandler();
    }

    addViews() {
        super.addViews();

        // form
        let form = document.createElement("form");
        form.setAttribute("id", "new-issue");
        form.setAttribute("action", "/issue");
        form.setAttribute("method", "/post");
        this.view.appendChild(form);

        // drop downs
        let drop_downs = document.createElement("fieldset");
        let key_required = true;
        let project_key_value_container = Utils.keyValueContainerInline(
            "Project",
            Utils.createDropDownMenu("project"),
            key_required
        );
        let type_key_value_container = Utils.keyValueContainerInline(
            "Type",
            Utils.createDropDownMenu("type"),
            key_required
        );
        drop_downs.appendChild(project_key_value_container);
        drop_downs.appendChild(type_key_value_container);
        form.appendChild(drop_downs);

        // seperator
        let seperator = Utils.createSeperator();
        form.appendChild(seperator);

        // textareas
    }



    eventHandler() {
        $("#new-issue").find("button[type='button']").click(function() {
            let project_acronym = Utils.getDropDownSelection(document.getElementById("project"));
            let project_id = controller.factory.getProjectId(project_acronym);
            let type_name = Utils.getDropDownSelection(document.getElementById("type"));
            let type_id = controller.factory.getTypeIdByName(type_name);
            let issueName = document.getElementById("name");
            let description = document.getElementById("description");
            let state_id = controller.factory.getStateIdByAcronym("s-td");
            let redirect = window.location.pathname;

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

            let form = $('#new-issue');
            form.append($("<input>").attr("type", "hidden").attr("name", "project").val(project_id));
            form.append($("<input>").attr("type", "hidden").attr("name", "type").val(type_id));
            form.append($("<input>").attr("type", "hidden").attr("name", "state").val(state_id));
            form.append($("<input>").attr("type", "hidden").attr("name", "redirect").val(redirect));
            form.submit();
        });
    }

    show() {
        super.show();

        Utils.dropDownPrepare(
            'type',
            this.parentController.factory.getTypeNames(),
            this.parentController.factory.getTypeNameById(this.parentController.factory.types[0].id)
        );
        Utils.dropDownPrepare(
            'project',
            this.parentController.factory.getProjectAcronyms(),
            this.parentController.factory.getProjectAcronyms()[0]
        );
    }
}