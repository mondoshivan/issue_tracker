let controller = null;

class PageController {
    
    constructor() {
        this.factory = new Factory();
        this.dialogController = null;
        this.quickFilter = new QuickFilter([
            new Filter(
                "Mark",
                "qf-mark",
                function(issue) {
                    return issue.user_assigned === 1;
                },
                false,
                true
            ),
            new Filter(
                "Edward",
                "qf-edward",
                function(issue) {
                    return issue.user_assigned === 2;
                },
                false,
                true
            ),
            new Filter(
                "Steve",
                "qf-steve",
                function(issue) {
                    return issue.user_assigned === 3;
                },
                false,
                true
            ),
            new Filter(
                "Bill",
                "qf-bill",
                function(issue) {
                    return issue.user_assigned === 4;
                },
                false,
                true
            ),
            new Filter(
                "hide done",
                "qf-hidedone",
                function(issue) {
                    return issue.state !== controller.factory.getStateIdByAcronym("s-do");
                },
                true,
                true
            )
        ]);
        
        this.columnLeftIsVisible = true;
        this.columnRightIsVisible = true;
        this.flexDirectionColumnMaxWidth = 600;

        window.onresize = function(event) {
            controller.setWindowSize();
        };
    }

    getWindowHeight() {
        let height = 0;
        if( typeof( window.innerWidth ) === 'number' ) {
            //Non-IE
            height = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            height = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            height = document.body.clientHeight;
        }
        return height;
    }

    getWindowWidth() {
        let width = 0;
        if( typeof( window.innerWidth ) === 'number' ) {
            //Non-IE
            width = window.innerWidth;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            width = document.documentElement.clientWidth;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            width = document.body.clientWidth;
        }
        return width;
    }

    setWindowSize() {
        let header = parseInt(document.getElementsByTagName("header")[0].clientHeight);
        let footer = parseInt(document.getElementsByTagName("footer")[0].clientHeight);
        let windowHeight = parseInt(this.getWindowHeight());
        let windowWidth  = parseInt(this.getWindowWidth());
        let total = windowHeight - (header + footer);
        let container = document.getElementsByClassName("flex-container")[0];

        if (windowWidth > this.flexDirectionColumnMaxWidth) {
            container.style.height = total + "px";
        } else {
            container.style.height = "100%";
        }
    }

    removeColumnLeft() {
        let column = document.getElementsByClassName('flex-item side left')[0];
        column.style.display = 'none';
        this.columnLeftIsVisible = false;
    }

    removeColumnRight() {
        let column = document.getElementsByClassName('flex-item side right')[0];
        column.style.display = 'none';
        this.columnRightIsVisible = false;
    }
    
    hideColumnLeft() {
        let column = document.getElementsByClassName('flex-item side left')[0];
        column.classList.add("collapsed");
        setTimeout(function(){controller.removeColumnLeft()}, 1000);
    }
    
    hideColumnRight() {
        let column = document.getElementsByClassName('flex-item side right')[0];
        column.classList.add("collapsed");
        setTimeout(function(){controller.removeColumnRight()}, 1000);
    }
    
    loadLeftColumn() {
        let closeButtonToBeRemoved = document.getElementsByClassName("close-button left")[0];
        if (closeButtonToBeRemoved) { closeButtonToBeRemoved.remove(); }
        let column = document.getElementsByClassName('flex-item side left')[0];
        let closeButton = document.createElement("div");
        closeButton.setAttribute("class", "close-button left");
        let textnode = document.createTextNode("X");
        closeButton.appendChild(textnode);
        column.insertBefore(closeButton, column.firstChild);

        document.getElementsByClassName('close-button left')[0].addEventListener('click', function (e) {
            controller.hideColumnLeft();
        });
    }
    
    loadRightColumn() {
        let closeButtonToBeRemoved = document.getElementsByClassName("close-button right")[0];
        if (closeButtonToBeRemoved) { closeButtonToBeRemoved.remove(); }
        let column = document.getElementsByClassName('flex-item side right')[0];
        let closeButton = document.createElement("div");
        closeButton.setAttribute("class", "close-button right");
        let textnode = document.createTextNode("X");
        closeButton.appendChild(textnode);
        column.insertBefore(closeButton, column.firstChild);

        document.getElementsByClassName('close-button right')[0].addEventListener('click', function (e) {
            controller.hideColumnRight();
        });
    }

    rightColumnSeparation(name) {
        let container = document.createElement("div");
        container.setAttribute("class", "separator-container");
        let details = document.createElement("div");
        details.setAttribute("class", "separator-name");
        details.appendChild(document.createTextNode(name));
        container.appendChild(details);
        let detailsSeperator = document.createElement("div");
        detailsSeperator.setAttribute("class", "separator");
        detailsSeperator.appendChild(document.createElement("hr"));
        container.appendChild(detailsSeperator);
        return container;
    }

    createQuickFilter(parent) {
        if (parent === null) { return; }
        Utils.removeAllChilds(parent);
        let header = document.createElement("h2");
        header.appendChild(document.createTextNode("Quick Filter"));
        parent.appendChild(header);

        for (let i=0; i<this.quickFilter.filters.length; i++) {
            if (!this.quickFilter.filters[i].visible) { continue; }
            let filter = document.createElement("div");
            let selected = this.quickFilter.filters[i].enabled ? " selected" : "";
            filter.setAttribute("class", "filter" + selected);
            filter.setAttribute("id", this.quickFilter.filters[i].id);
            filter.appendChild(
                document.createTextNode(
                    this.quickFilter.filters[i].name
                )
            );
            parent.appendChild(filter);
        }
    }

    createQuickFilterEventHandlers() {
        let quickFilters = document.getElementsByClassName("filter");
        for (let i=0; i<quickFilters.length; i++) {
            let filterId = quickFilters[i].getAttribute("id");
            quickFilters[i].addEventListener('click', function (e) {
                if (e.target.classList.contains("selected")) {
                    e.target.classList.remove("selected");
                    controller.quickFilter.getFilter(filterId).setEnabled(false);
                } else {
                    e.target.classList.add("selected");
                    controller.quickFilter.getFilter(filterId).setEnabled(true);
                }
                controller.refresh(null);
            });
        }
    }

    createHeaderVisibilityEventHandler() {
        let headerVisibility = document.getElementById("header-visibility");
        if (headerVisibility === null) { return; }
        headerVisibility.addEventListener('click', function(e) {
            let removeable = document.getElementsByClassName("header-removeable");

            if (e.target.classList.contains("collapsed")) {
                e.target.classList.remove('collapsed');
                for (let i=0; i<removeable.length; i++) { removeable[i].classList.remove('removed');}
            } else {
                e.target.classList.add('collapsed');
                for (let i=0; i<removeable.length; i++) { removeable[i].classList.add('removed');}
            }
            controller.setWindowSize();
        });
    }

    start() {
        getData('/user/all', function(data){
            controller.factory.users = data;
            getData('/project/all', function(data){
                controller.factory.projects = data;
                getData('/state/all', function(data){
                    controller.factory.states = data;
                    getData('/type/all', function(data){
                        controller.factory.types = data;
                        getData('/sprint/all', function(data){
                            controller.factory.sprints = data;
                            getData('/issue/all', function(data){
                                controller.factory.setIssues(data);
                                controller.dialogController = new DialogController(controller);
                                controller.refresh(null);
                            });
                        });
                    });
                });
            });
        });


        this.createHeaderVisibilityEventHandler();
    }
    
    refresh(selected) {
        this.createQuickFilter(document.getElementById("quick-filter"));
        this.createQuickFilterEventHandlers();
        this.setWindowSize();
    }
    
    
}