

class DialogController {
    
    constructor(view, parentController) {
        this.view = view;
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

        this.header_h1 = null;
    }

    setHeader(title) {
        let textNodeName = document.createTextNode(title);
        this.header_h1.appendChild(textNodeName);
    }

    addViews() {
        // header
        let header = document.createElement("div");
        header.classList.add("header");
        this.header_h1 = document.createElement("h1");
        header.appendChild(this.header_h1);
        this.view.appendChild(header);
    }
    
    show() {
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