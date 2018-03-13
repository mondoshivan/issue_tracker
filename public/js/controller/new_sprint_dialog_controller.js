

class NewSprintDialogController extends DialogController {

    constructor(view, parentController) {
        super(view, parentController);

        this.id = 'new-sprint';

        this.addViews();
        this.setHeader("New Sprint");
        this.eventHandler();
    }

    addViews() {
        super.addViews();

        // form
        let form = document.createElement("form");
        form.setAttribute("id", this.id);
        form.setAttribute("action", "/sprint");
        form.setAttribute("method", "post");
        this.view.appendChild(form);

    }


    eventHandler() {
        $("#"+this.id).find("button[type='button']").click(function() {
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

            let form = $('#'+this.id);
            form.append($("<input>").attr("type", "hidden").attr("name", "project").val(project_id));
            form.append($("<input>").attr("type", "hidden").attr("name", "type").val(type_id));
            form.append($("<input>").attr("type", "hidden").attr("name", "state").val(state_id));
            form.append($("<input>").attr("type", "hidden").attr("name", "redirect").val(redirect));
            form.submit();
        });
    }

    show() {
        super.show();

    }
}